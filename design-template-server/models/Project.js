const mongoose = require("mongoose");

const ButtonSchema = new mongoose.Schema({
  color: String,
  textColor: String,
  radius: String,
  border: String,
  padding: String,
  fontSize: String,
  fontWeight: String,
  letterSpacing: String,
  textTransform: String,
  boxShadow: String,
  lineHeight: String,
  hoverBg: String,
  hoverText: String,
  hoverBorder: String,
});

const FontPickerSchema = new mongoose.Schema({
  head: String,
  main: String,
  extra: String,
});

const ColourRowSchema = new mongoose.Schema({
  label: String,
  colors: {
    type: [String],
    validate: [(arr) => arr.length <= 8, "Max 8 colors per row"],
  },
});

const ColourPickerSchema = new mongoose.Schema({
  rows: [ColourRowSchema],
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  shared: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
  borderRadius: String,
  primaryButton1: ButtonSchema,
  primaryButton2: ButtonSchema,
  primaryButton3: ButtonSchema,
  secondaryButton1: ButtonSchema,
  secondaryButton2: ButtonSchema,
  secondaryButton3: ButtonSchema,
  tertiaryButton1: ButtonSchema,
  tertiaryButton2: ButtonSchema,
  tertiaryButton3: ButtonSchema,
  tabButton1: ButtonSchema,
  tabButton2: ButtonSchema,
  tabButton3: ButtonSchema,
  fontPicker1: FontPickerSchema,
  fontPicker2: FontPickerSchema,
  fontPicker3: FontPickerSchema,
  colourPicker1: ColourPickerSchema,
  colourPicker2: ColourPickerSchema,
  colourPicker3: ColourPickerSchema,
  inputs: { type: Object, default: {} },
  backgrounds: { type: Object, default: {} },
  boxShadows: { type: [Object], default: [] },
  spacingScale: {
    base: { type: Number, default: 1 },
    unit: { type: String, default: "rem" },
    custom: { type: Object },
  },
  fontScale: {
    type: Object,
    default: {},
  },
  logo: { type: String },
  // Shared text fields
  heroTitle: { type: String, default: "" },
  heroSubtitle: { type: String, default: "" },
  descriptionTitle: { type: String, default: "" },
  descriptionDesc: { type: String, default: "" },
  testimonialQuote: { type: String, default: "" },
  testimonialAuthor: { type: String, default: "" },
  companiesTrustedText: { type: String, default: "" },
  footerCopyright: { type: String, default: "" },
  footerLinks: { type: [String], default: [] },
  threeIcons: { type: [Object], default: [] },
});

module.exports = mongoose.model("Project", ProjectSchema);
