import Reviews from "../models/Reviews.js";
import User from "../models/User.js";
import Vendor from "../models/Vendors.js";

export const vendorDetailsForCustomer = async (req, res) => {
    const { vendorId } = req.body;

    try {
        const vendor = await Vendor.findOne({ _id: vendorId }).populate("vendorInfo", "-password -__v");

        if (vendor)
            res.status(200).json(vendor);
        else throw new Error("error");
    } catch (error) {
        
    }
}

export const createVendor = async (req, res) => {
    const userId = req.body.userId;
    
    await Vendor.create({
        vendorInfo: userId
    })

    res.status(200).json("Added as vendor");
}

export const getVendors = async (req, res) => {
    const { serviceName } = req.body;

    try {
        const allUserVendors = await User.find({ workType: serviceName });

        if (allUserVendors.length !== 0) {
            const filteredVendors = await Vendor.find({
                vendorInfo: { $in: allUserVendors.map(userVendor => userVendor._id) }
            })
            .populate("vendorInfo", "-password -__v")
            .sort({ averageRating: -1 });

            res.status(200).json(filteredVendors);
        }
        else {
            res.status(400);
            throw new Error("No Vendors Available")
        }
    } catch (error) {
        res.status(500).json( error.message );
    }
};

export const isVendor = async (req, res) => {
    try {
        const isAVendor = await Vendor.findOne({ vendorInfo: req.user._id }).lean().exec();
        if (isAVendor) {
            res.status(200).json({ vendor: isAVendor });
        } else {
            res.status(404).json({ error: 'You are not a vendor' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const allReviews = async (req, res) => {
    const { vendorId } = req.body;
    const reviews = await Reviews.find({ vendor: vendorId }).populate("customer", "-password -__v").sort("-createdAt");
    res.status(200).json({ reviews: reviews });
}

export const allRating = async (req, res) => {
    const { vendorId } = req.body;
    
    const vendor = await Vendor.findOne({ vendorInfo: vendorId }).populate("vendorInfo", "-passowrd -__v");

    let totalRatings = 0;
    let totalStars = 0;

    vendor.ratings && vendor.ratings.forEach((rating) => {
        totalRatings += rating.count;
        totalStars += rating.stars * rating.count;
    });

    if (totalRatings !== 0)
        vendor.averageRating = totalStars / totalRatings;

    // Create an object to store the count of each star value
    const starCounts = {};

    vendor.ratings.forEach((ratingObj) => {
    const stars = ratingObj.stars;
    const count = ratingObj.count;

    // Update the count for each star value in the starCounts object
    if (starCounts[stars]) {
        starCounts[stars] += count;
    } else {
        starCounts[stars] = count;
    }
    });

    await vendor.save();

    res.status(200).json(starCounts);

}

export const reviewAndRating = async (req, res) => {
    const { userId, vendorId, review, rating } = req.body;

    try {
        if (review && rating === 0) { 
        await Reviews.create({
            customer: userId,
            vendor: vendorId,
            review
        });

        const reviews = await Reviews.find({ vendor: vendorId }).populate("customer", "-password -__v").sort("-createdAt");

        res.status(200).json({ msg: "Review Added", reviews: reviews });

        res.status(200).json()
    } else if (!review && rating > 0) {
        const vendor = await Vendor.findOne({ vendorInfo: vendorId }).populate("vendorInfo", "-password");

        const hasRated = vendor.ratings && vendor.ratings.some((rating) => rating.userId.toString() === userId);
        if (hasRated) {
            // user has already rated the vendor
            throw new Error("Already Rated");
        }

        // Find the index of the matching ratings object based on the stars value
        const ratingsIndex = vendor.ratings && vendor.ratings.findIndex((rating) => rating.stars === rating);
        if (ratingsIndex !== -1) {
            // Increment the count if the ratings object exists
            vendor.ratings && vendor.ratings[ratingsIndex].count++;
        } else {
            // Add a new ratings object if it does not exist
            vendor.ratings.push({ userId, stars: rating, count: 1 });
        }
            
        // Update the average rating
        let totalRatings = 0;
        let totalStars = 0;

        vendor.ratings && vendor.ratings.forEach((rating) => {
            totalRatings += rating.count;
            totalStars += rating.stars * rating.count;
        });

        vendor.averageRating = totalStars / totalRatings;


        const starCounts = {};
        vendor.ratings.forEach((ratingObj) => {
        const stars = ratingObj.stars;
        const count = ratingObj.count;

        // Update the count for each star value in the starCounts object
        if (starCounts[stars]) {
            starCounts[stars] += count;
        } else {
            starCounts[stars] = count;
        }
        });

            vendor.totalRating = Object.keys(starCounts).length;

        // Save the vendor document
        await vendor.save();

        res.status(200).json({ msg: "Rating Added", vendor: vendor, starCounts: starCounts });
    } else if (review && rating > 0) {
        await Reviews.create({
            customer: userId,
            vendor: vendorId,
            review
        });

        const reviews = await Reviews.find({ vendor: vendorId }).populate("customer", "-password -__v").sort("-createdAt");

        // Then, update the rating logic

        const vendor = await Vendor.findOne({ vendorInfo: vendorId }).populate("vendorInfo", "-password");

        const hasRated = vendor.ratings && vendor.ratings.some((rating) => rating.userId.toString() === userId);
        if (hasRated) {
            // user has already rated the vendor
            throw new Error("Already Rated");
        }

        // Find the index of the matching ratings object based on the stars value
        const ratingsIndex = vendor.ratings && vendor.ratings.findIndex((rating) => rating.stars === rating);
        if (ratingsIndex !== -1) {
            // Increment the count if the ratings object exists
            vendor.ratings && vendor.ratings[ratingsIndex].count++;
        } else {
            // Add a new ratings object if it does not exist
            vendor.ratings.push({ userId, stars: rating, count: 1 });
        }
        // Update the average rating
        let totalRatings = 0;
        let totalStars = 0;

        vendor.ratings && vendor.ratings.forEach((rating) => {
            totalRatings += rating.count;
            totalStars += rating.stars * rating.count;
        });

        vendor.averageRating = totalStars / totalRatings;

        const starCounts = {};
        vendor.ratings.forEach((ratingObj) => {
            const stars = ratingObj.stars;
            const count = ratingObj.count;

            // Update the count for each star value in the starCounts object
            if (starCounts[stars]) {
                starCounts[stars] += count;
            } else {
                starCounts[stars] = count;
            }
        });

        // Save the vendor document
        await vendor.save();

        res.status(200).json({ msg: "Review and Rating Added", reviews: reviews, ratings: starCounts,vendor: vendor });
    }
    } catch (error) {
        res.status(500).json( error.message );
    }
}

export const editProfile = async (req, res) => {
    const { city } = req.body;
    const userId = req.body.userId.userId;
    const shopAddress = req.body.shopAddress;

    try {
        if (city && !shopAddress) {
            await User.findByIdAndUpdate(
                userId,
                {
                    city
                },
                {
                    new: true
                }
            )
            const user = await User.findOne({_id: userId});
            res.status(200).json({user: user, msg: "city updated"})
        } else if (shopAddress && !city) {
            await User.findByIdAndUpdate(
                userId,
                {
                    shopAddress
                },
                {
                    new: true
                }
            )
            const user = await User.findOne({_id: userId});
            res.status(200).json({user: user, msg: "address updated"})
        } else if (city && shopAddress) {
            await User.findByIdAndUpdate(
                userId,
                {
                    city,
                    shopAddress
                },
                {
                    new: true
                }
            )
            const user = await User.findOne({_id: userId});
            res.status(200).json({user: user, msg: "city & address updated"})
        } else {
            res.status(404)
            throw new Error("Enter a field")
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
