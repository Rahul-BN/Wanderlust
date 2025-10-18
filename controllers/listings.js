const Listing = require("../models/listing.js")
const { geocodeLocation } = require("../utils/geocoder.js");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }



module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}



module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "You Requested Listing does not exist!");
      return res.redirect("/listings");
    }

    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }



// module.exports.createListing = async (req, res, next) => {
//       let url = req.file.path;
//       let filename = req.file.filename;
//       console.log(url , "......" , filename)
//       const newListing = new Listing(req.body.listing); //For this req.body.listing we set above code as it is.
//       console.log(req.user); //if youre confused abt then you can print and knwo it.  it from user model.
//       newListing.owner = req.user._id;
//       newListing.image = {url,filename}
//       await newListing.save();
//       req.flash("success", "New Listing Created!");
//       res.redirect("/listings");
//     }


module.exports.createListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;
        
        // ADD GEOCODING LOGIC HERE
        const geocodedData = await geocodeLocation(req.body.listing.location);
        
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url, filename};
        
        // ADD COORDINATES FROM GEOCODING
        if (geocodedData) {
            newListing.geometry = {
                type: 'Point',
                coordinates: geocodedData.coordinates
            };
            newListing.mapLocation = geocodedData.formattedAddress;
        } else {
            // Default coordinates (center of world map) if geocoding fails
            newListing.geometry = {
                type: 'Point',
                coordinates: [0, 0]
            };
        }
        
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (error) {
        req.flash("error", "Error creating listing");
        res.redirect("/listings/new");
    }
}




module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "You Requested Listing does not exist!");
      return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" , "/upload/w_250")
    res.render("listings/edit.ejs", { listing , originalImageUrl });
  }



module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  // ADD GEOCODING FOR UPDATES TOO
    const geocodedData = await geocodeLocation(req.body.listing.location);
    if (geocodedData) {
        listing.geometry = {
            type: 'Point',
            coordinates: geocodedData.coordinates
        };
        listing.mapLocation = geocodedData.formattedAddress;
    }


    if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url , filename}
      await listing.save();
    }
    
    await listing.save();
    req.flash("success", "Listing is Updated!");
    res.redirect(`/listings/${id}`);
}



module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }


// module.exports.showAllListingsMap = async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/map.ejs", { allListings });
// };