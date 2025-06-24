const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://main:main@cluster0main.ztxrgoz.mongodb.net/dbShopping";

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

// MongoDB Connection (Updated)
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection established");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Admin Schema (remains unchanged)
const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: [true, "Admin name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
  },
  adminEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
  },
  adminPassword: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
}, {
  timestamps: true,
});

// Password hashing middleware (remains unchanged)
adminSchema.pre("save", async function(next) {
  if (!this.isModified("adminPassword")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.adminPassword = await bcrypt.hash(this.adminPassword, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const Admin = mongoose.model("Admin", adminSchema);


const validateAdmin = [
  body("adminName").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("adminEmail").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("adminPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];


// Validation for PATCH updates
const validateAdminUpdate = [
  body("adminName").optional().trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("adminEmail").optional().isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("adminPassword").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];


app.post("/admin", validateAdmin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingAdmin = await Admin.findOne({ adminEmail: req.body.adminEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


app.get("/admin", async (req, res) => {
  try {
    const admins = await Admin.find({}, "-adminPassword");
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


app.get("/admin/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id, "-adminPassword");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


app.patch("/admin/:id", validateAdminUpdate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updates = req.body;
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if email is being updated and already exists
    if (updates.adminEmail && updates.adminEmail !== admin.adminEmail) {
      const existingAdmin = await Admin.findOne({ adminEmail: updates.adminEmail });
      if (existingAdmin) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    Object.assign(admin, updates);
    await admin.save();
    res.status(200).json({ message: "Admin updated successfully", admin: { ...admin.toObject(), adminPassword: undefined } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




// Error handling middleware (remains unchanged)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server (remains unchanged)
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});