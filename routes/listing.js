const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]") ,
    validateListing,
    wrapAsync(listingController.createListing)
  );
  

// More flexible search that handles minor typos
router.get('/search', async (req, res) => {
    try {
        const { country } = req.query;
        
        if (!country) {
            return res.redirect('/listings');
        }

        // Remove extra spaces and make case-insensitive
        const searchTerm = country.trim();
        
        const listings = await Listing.find({
            $or: [
                { country: { $regex: new RegExp(searchTerm, 'i') } },
                { location: { $regex: new RegExp(searchTerm, 'i') } } 
            ]
        });

        if (listings.length === 0) {
            req.flash('error', `No listings found for "${searchTerm}". Try another country name.`);
            return res.redirect('/listings');
        }

        res.render('listings/index', { 
            allListings: listings,
            currentUser: req.user,
            searchQuery: searchTerm
        });

    } catch (error) {
        console.error('Search error:', error);
        req.flash('error', 'Error searching listings');
        res.redirect('/listings');
    }
});





//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]") ,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


// ADD THIS ROUTE AFTER YOUR EXISTING ROUTES
// router.get("/map/all", wrapAsync(listingController.showAllListingsMap));





module.exports = router;
