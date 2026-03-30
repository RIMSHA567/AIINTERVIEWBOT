import multer from "multer";

// ==============================
// STORAGE CONFIGURATION
// ==============================

const storage = multer.diskStorage({
  // 📁 File kahan save hogi
  destination: function (req, file, cb) {
    // "public" folder ke andar file store hogi
    cb(null, "public");
  },

  // 🏷 File ka naam kya hoga
  filename: function (req, file, cb) {
    // unique name banaya (time + original name)
    const filename = Date.now() + "-" + file.originalname;

    cb(null, filename);
  },
});

// ==============================
// MULTER SETUP
// ==============================
export const upload = multer({
  storage: storage, // upar wali storage use ho rahi hai

  limits: {
    fileSize: 5 * 1024 * 1024, // 📏 max file size = 5MB
  },
});
console.log("multer akhar my my");
