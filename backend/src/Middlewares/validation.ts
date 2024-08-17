
        import { body, validationResult } from "express-validator";
        import { Request, Response, NextFunction } from "express";
        // SERVER-SIDE VALIDATION
        const handleValidationErrors = async (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        };
        export const validateMyLoginRequest = [
          body("email").isString().notEmpty().isEmail().normalizeEmail().withMessage("Please enter a valid email address"),
          body("password").isString().notEmpty().isLength({ min: 8, max: 100 }).withMessage("Password must be atleast 8 characters long"),
          handleValidationErrors,
        ];
        export const validateMySignupRequest = [
          body("name").isString().notEmpty().withMessage("Name must be a string").isLength({ min: 3, max: 100 }),
          body("email").isString().notEmpty().isEmail().normalizeEmail().withMessage("Please enter a valid email address"),
          body("password").isString().notEmpty().isLength({ min: 8, max: 100 }).withMessage("Password must be atleast 8 characters long"),
          handleValidationErrors,
        ];
        export const validateMyUserRequest = [
          body("name").isString().notEmpty().withMessage("Name must be a string").isLength({ min: 3, max: 100 }),
          body("email").isString().notEmpty().isEmail().normalizeEmail().withMessage("Please enter a valid email address"),
          body("password").isString().notEmpty().isLength({ min: 8, max: 100 }).withMessage("Password must be atleast 8 characters long"),
          body("phoneNumber")
          .optional()
          .isString()
          .matches(/^\+?[1-9]\d{1,14}$/)  // Regex pattern to validate international phone numbers
          .withMessage("Please enter a valid phone number"),
          body("addressLine1")
            .isString()
            .notEmpty()
            .withMessage("AddressLine1 must be a string"),
          body("city").isString().notEmpty().withMessage("City must be a string"),
          handleValidationErrors,
        ];
        
        export const validateMyRestaurantRequest = [
          body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
          body("city").notEmpty().withMessage("City is required"),
          body("country").notEmpty().withMessage("Country is required"),
          body("deliveryPrice")
            .isFloat({ min: 0 })
            .withMessage("Delivery price must be a positive number"),
          body("estimatedDeliveryTime")
            .isInt({ min: 0 })
            .withMessage("Estimated delivery time must be a postive integer"),
          body("cuisines")
            .isArray()
            .withMessage("Cuisines must be an array")
            .not()
            .isEmpty()
            .withMessage("Cuisines array cannot be empty"),
          body("menuItems").isArray().withMessage("Menu items must be an array"),
          body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
          body("menuItems.*.price")
            .isFloat({ min: 0 })
            .withMessage("Menu item price is required and must be a postive number"),
          handleValidationErrors,
        ];
