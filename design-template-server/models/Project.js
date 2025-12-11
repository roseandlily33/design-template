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
  updatedAt: { type: Date, default: Date.now },
  borderRadius: String,
  primaryButton: ButtonSchema,
  secondaryButton: ButtonSchema,
  tertiaryButton: ButtonSchema,
  fontPicker1: FontPickerSchema,
  fontPicker2: FontPickerSchema,
  fontPicker3: FontPickerSchema,
  colourPicker1: ColourPickerSchema,
  colourPicker2: ColourPickerSchema,
  colourPicker3: ColourPickerSchema,
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
});

module.exports = mongoose.model("Project", ProjectSchema);
