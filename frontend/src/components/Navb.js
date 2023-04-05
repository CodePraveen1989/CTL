import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useLocation } from "react-router-dom";
import "./page.css";

//categories。
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../redux/actions/categoryActions";

const Navb = () => {
  //categories
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  /* ************** Brands ************* */
  var BRANDS = [
    {
      label: "Paramount Safety",
      type: 1,
      link: "/product-list?searchQuery=PARAMOUNT-SAFETY",
      Brand_Logo: "/images/Brands/PARAMOUNT-logo.jpg",
    },
    {
      label: "WIHA TOOLS",
      type: 1,
      link: "/product-list?searchQuery=WIHA",
      Brand_Logo: "/images/Brands/WIHA-logo.jpg",
    },
    {
      label: "SWARTS TOOLS",
      type: 1,
      link: "/product-list?searchQuery=SWARTS-TOOLS",
      Brand_Logo: "/images/Brands/SWARTS-logo.jpg",
    },
    {
      label: "MILWAUKEE",
      type: 1,
      link: "/product-list?searchQuery=MILWAUKEE",
      Brand_Logo: "/images/Brands/MILWAUKEE-logo.jpg",
    },
    {
      label: "STARRETT",
      type: 1,
      link: "/product-list?searchQuery=STARRETT",
      Brand_Logo: "/images/Brands/STARRETT-logo.jpg",
    },
  ];

  /* ************** Categories ************* */
  var nav_color = {
    2: "subCat",
    3: "childCat",
    4: "fourCat",
  };

  /* PPE */
  var PPE = "/product-list?categoryName=PPE";
  // #region
  var PPE_HEADWEAR = PPE + "&subCategoryName=PROTECTIVE-HEADWEAR";
  var PPE_HEADWEAR3 = [
    { label: "PROTECTIVE HEADWEAR", type: 2, link: PPE_HEADWEAR },
    {
      label: "HARD HATS",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HATS",
    },
    {
      label: "HARD HAT ACCESSORIES",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HAT-ACCESSORIES",
    },
    {
      label: "HARD HATS WITH LAMP BRACKETS",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HAT-WITH-LAMP-BRACKETS",
    },
  ];

  var PPE_FACE = PPE + "&subCategoryName=FACE-PROTECTION";
  var PPE_FACE3 = [
    { label: "FACE PROTECTION", type: 2, link: PPE_FACE },
    {
      label: "BROWGUARD/ VISOR COMBO",
      type: 3,
      link: PPE_FACE + "&childCategoryName=BROWGUARD-VISOR-COMBO",
    },
    {
      label: "FACE ACCESSORIES",
      type: 3,
      link: PPE_FACE + "&childCategoryName=FACE-ACCESSORIES",
    },
  ];

  var PPE_HEARING = PPE + "&subCategoryName=HEARING-PROTECTION";
  var PPE_HEARING3 = [
    { label: "HEARING PROTECTION", type: 2, link: PPE_HEARING },
    {
      label: "DISPOSABLE EARPLUGS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=DISPOSABLE-EARPLUGS",
    },
    {
      label: "REUSABLE EARPLUGS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=REUSABLE-EARPLUGS",
    },
    {
      label: "EARMUFFS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=EARMUFFS",
    },
    {
      label: "HEARING ACCESSORIES",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=HEARING-ACCESSORIES",
    },
  ];

  var PPE_EYE = PPE + "&subCategoryName=EYE-PROTECTION";
  var PPE_EYE3 = [
    { label: "EYE PROTECTION", type: 2, link: PPE_EYE },
    {
      label: "SAFETY GLASSES",
      type: 3,
      link: PPE_EYE + "&childCategoryName=SAFETY-GLASSES",
    },
    {
      label: "EYE ACCESSORIES",
      type: 3,
      link: PPE_EYE + "&childCategoryName=EYE-ACCESSORIES",
    },
  ];

  var PPE_RESPIRATORY = PPE + "&subCategoryName=RESPIRATORY-GEAR";
  var PPE_RESPIRATORY3 = [
    { label: "RESPIRATORY GEAR", type: 2, link: PPE_RESPIRATORY },
    {
      label: "HALF MASKS & ACCESSORIES",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=HALF-MASKS-ACCESSORIES",
    },
    {
      label: "PROMESH",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=PROMESH",
    },
    {
      label: "DISPOSABLE RESPIRATORY",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=DISPOSABLE-RESPIRATORY",
    },
    {
      label: "REUSABLE RESPIRATORY",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=REUSABLE-RESPIRATORY",
    },
  ];

  var PPE_HAND = PPE + "&subCategoryName=HAND-PROTECTION";
  var PPE_HAND3 = [
    { label: "HAND PROTECTION", type: 2, link: PPE_HAND },
    {
      label: "CUT RESISTANT RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=CUT-RESISTANT-RANGE",
    },
    {
      label: "LEATHER RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=LEATHER-RANGE",
    },
    {
      label: "DISPOSABLE RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=DISPOSABLE-RANGE",
    },
    {
      label: "WELDING RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=WELDING-RANGE",
    },
    {
      label: "HAND ACCESSORIES",
      type: 3,
      link: PPE_HAND + "&childCategoryName=HAND-ACCESSORIES",
    },
    {
      label: "VEND READY GLOVE RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=VEND-READY-GLOVE-RANGE",
    },
  ];

  var PPE_WORKWEAR = PPE + "&subCategoryName=PROTECTIVE-WORKWEAR";
  var PPE_WORKWEAR3 = [
    { label: "PROTECTIVE WORKWEAR", type: 2, link: PPE_WORKWEAR },
    {
      label: "WELDING PROTECTION",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=WELDING-PROTECTION",
    },
    {
      label: "KNEE PADS",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=KNEE-PADS",
    },
    {
      label: "APRONS",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=APRONS",
    },
    {
      label: "PROTECTIVE HEADWEAR",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=PROTECTIVE-HEADWEAR",
    },
    {
      label: "PROTECTIVE FOOTWEAR",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=PROTECTIVE-FOOTWEAR",
    },
  ];

  var PPE_DISPOSABLE = PPE + "&subCategoryName=DISPOSABLE-PROTECTION";
  var PPE_DISPOSABLE3 = [
    { label: "DISPOSABLE PROTECTION", type: 2, link: PPE_DISPOSABLE },
    {
      label: "BODY PROTECTION",
      type: 3,
      link: PPE_DISPOSABLE + "&childCategoryName=BODY-PROTECTION",
    },
  ];

  var PPE_SUN = PPE + "&subCategoryName=SUN-PROTECTION";
  var PPE_SUN3 = [
    { label: "SUN PROTECTION", type: 2, link: PPE_SUN },
    {
      label: "SUNSCREEN",
      type: 3,
      link: PPE_SUN + "&childCategoryName=SUNSCREEN",
    },
    {
      label: "LIP BALM",
      type: 3,
      link: PPE_SUN + "&childCategoryName=LIP-BALM",
    },
    {
      label: "SUN PROTECTION ACCESSORIES",
      type: 3,
      link: PPE_SUN + "&childCategoryName=SUN-PROTECTION-ACCESSORIES",
    },
  ];

  var PPE_HYDRATION = PPE + "&subCategoryName=HYDRATION";
  var PPE_HYDRATION3 = [
    { label: "HYDRATION", type: 2, link: PPE_HYDRATION },
    {
      label: "HYDRATION CONCENTRATES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=HYDRATION-CONCENTRATES",
    },
    {
      label: "COOLERS & DRINK BOTTLES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=COOLERS-DRINK-BOTTLES",
    },
    {
      label: "COOLING APPAREL",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=COOLING-APPAREL",
    },
    {
      label: "ICY POLES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=ICY-POLES",
    },
    {
      label: "HYDRATION BACKPACK",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=HYDRATION-BACKPACK",
    },
  ];
  // #endregion

  /* SITE_SAFETY */
  var SITE_SAFETY = "/product-list?categoryName=SITE-SAFETY";
  // #region
  var SS_DG_CABINETS =
    SITE_SAFETY + "&subCategoryName=DG-CABINETS";
  var SS_DG_CABINETS3 = [
    { label: "DANGEROUS GOODS CABINETS", type: 2, link: SS_DG_CABINETS },
  ];

  var SS_SHORES_EYEWASH =
    SITE_SAFETY + "&subCategoryName=EMERGENCY-SHOWERS-EYEWASH";
  var SS_SHORES_EYEWASH3 = [
    { label: "EMERGENCY SHOWERS & EYEWASH", type: 2, link: SS_SHORES_EYEWASH },
    {
      label: "COMBINATION UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=COMBINATION-UNITS",
    },
    {
      label: "FIXED WALL MOUNTED EYE WASH UNITS",
      type: 3,
      link:
        SS_SHORES_EYEWASH +
        "&childCategoryName=FIXED-WALL-MOUNTED-EYE-WASH-UNITS",
    },
    {
      label: "FIXED PEDESTAL MOUNTED EYE WASH UNITS",
      type: 3,
      link:
        SS_SHORES_EYEWASH +
        "&childCategoryName=FIXED-PEDESTAL-MOUNTED-EYE-WASH-UNITS",
    },
    {
      label: "ABORATORY UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=ABORATORY-UNITS",
    },
    {
      label: "PORTABLE EYE WASH UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=PORTABLE-EYE-WASH-UNITS",
    },
    {
      label: "SHOWER SPARE PARTS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SHOWER-SPARE-PARTS",
    },
    {
      label: "SHOWER ACCESSORIES",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SHOWER-ACCESSORIES",
    },
    {
      label: "SIGNS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SIGNS",
    },
  ];

  var SS_SPILL_KITS = SITE_SAFETY + "&subCategoryName=SPILL-KITS";
  var SS_SPILL_KITS_3 = [
    { label: "SPILL KITS", type: 2, link: SS_SPILL_KITS },
    {
      label: "GENERAL PURPOSE SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=GENERAL-PURPOSE-SPILL-KITS",
    },
    {
      label: "HAZCHEM SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=HAZCHEM-SPILL-KITS",
    },
    {
      label: "OIL & FUEL SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=OIL-FUEL-SPILL-KITS",
    },
    {
      label: "LIGHT VEHICLE SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=LIGHT-VEHICLE-SPILL-KITS",
    },
    {
      label: "REFILLS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=REFILLS",
    },
    {
      label: "ACCESSORIES",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=ACCESSORIES",
    },
  ];

  var SS_SPILL_CONTAINMENT = SITE_SAFETY + "&subCategoryName=SPILL-CONTAINMENT";
  var SS_SPILL_CONTAINMENT3 = [
    { label: "SPILL CONTAINMENT", type: 2, link: SS_SPILL_CONTAINMENT },
    {
      label: "SPILL PALLET",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=SPILL-PALLET",
    },
    {
      label: "LOW PROFILE SPILL DECKS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=LOW-PROFILE-SPILL-DECKS",
    },
    {
      label: "IBC SPILL PALLETS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=IBC-SPILL-PALLETS",
    },
    {
      label: "SPILL TRAYS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=SPILL-TRAYS",
    },
    {
      label: "OVERPACK DRUMS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=OVERPACK-DRUMS",
    },
    {
      label: "SMOKE STOP CIGARETTE BUTT CANS",
      type: 3,
      link:
        SS_SPILL_CONTAINMENT +
        "&childCategoryName=SMOKE-STOP-CIGARETTE-BUTT-CANS",
    },
  ];

  var SS_FIRST_AID = SITE_SAFETY + "&subCategoryName=FIRST-AID";
  var SS_FIRST_AID3 = [
    { label: "FIRST AID", type: 2, link: SS_FIRST_AID },
    {
      label: "RESPONSE KITS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=RESPONSE-KITS",
    },
    {
      label: "REFILLS & REPLACEMENTS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=REFILLS-REPLACEMENTS",
    },
    {
      label: "EYEWASH",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=EYEWASH",
    },
    {
      label: "HYGIENE",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=HYGIENE",
    },
    {
      label: "DEFIBRILLATORS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=DEFIBRILLATORS",
    },
    {
      label: "INCIDENT READY KIT",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=INCIDENT-READY-KIT",
    },
    {
      label: "MOTORIST",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=MOTORIST",
    },
  ];

  var SS_ACCESSORIES = SITE_SAFETY + "&subCategoryName=ACCESSORIES";
  var SS_ACCESSORIES3 = [
    { label: "ACCESSORIES", type: 2, link: SS_ACCESSORIES },
    {
      label: "BARRIERS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BARRIERS",
    },
    {
      label: "BUNTING",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BUNTING",
    },
    {
      label: "PLASTIC CHAIN",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=PLASTIC-CHAIN",
    },
    {
      label: "SAFETY TAGS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=SAFETY-TAGS",
    },
    {
      label: "BARRICADE/HAZARD TAPES",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BARRICADE-HAZARD-TAPES",
    },
    {
      label: "BOLLARDS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BOLLARDS",
    },
    {
      label: "TRAFFIC CONES",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=TRAFFIC-CONES",
    },
  ];
  //#endregion

  /* HAND TOOLS */
  var FASTENERS = "/product-list?categoryName=FASTENERS";
  // #region
  var FT_HIGH_TENSILE_FASTENERS =
    FASTENERS + "&subCategoryName=HIGH-TENSILE-FASTENERS";
  var FT_HIGH_TENSILE_FASTENERS_3 = [
    {
      label: "HIGH-TENSILE FASTENERS",
      type: 2,
      link: FT_HIGH_TENSILE_FASTENERS,
    },
    {
      label: "THREADED ROD",
      type: 3,
      link: FT_HIGH_TENSILE_FASTENERS + "&childCategoryName=THREADED-ROD",
    },
    {
      label: "BOLTS",
      type: 3,
      link: FT_HIGH_TENSILE_FASTENERS + "&childCategoryName=BOLTS",
    },
    {
      label: "NUTS",
      type: 3,
      link: FT_HIGH_TENSILE_FASTENERS + "&childCategoryName=NUTS",
    },
    {
      label: "WASHERS",
      type: 3,
      link: FT_HIGH_TENSILE_FASTENERS + "&childCategoryName=WASHERS",
    },
  ];
  var FT_STAINLESS_HARDWEAR = FASTENERS + "&subCategoryName=STAINLESS-HARDWEAR";
  var FT_STAINLESS_HARDWEAR_3 = [
    { label: "STAINLESS HARDWEAR", type: 2, link: FT_STAINLESS_HARDWEAR },
    {
      label: "D SHACKEL",
      type: 3,
      link: FT_STAINLESS_HARDWEAR + "&childCategoryName=D-SHACKEL",
    },
    {
      label: "EYE BOLT",
      type: 3,
      link: FT_STAINLESS_HARDWEAR + "&childCategoryName=EYE-BOLT",
    },
    {
      label: "U BOLT",
      type: 3,
      link: FT_STAINLESS_HARDWEAR + "&childCategoryName=U-BOLT",
    },
    {
      label: "HINGES",
      type: 3,
      link: FT_STAINLESS_HARDWEAR + "&childCategoryName=HINGES",
    },
    {
      label: "CHAIN LINK",
      type: 3,
      link: FT_STAINLESS_HARDWEAR + "&childCategoryName=CHAIN-LINK",
    },
    {
      label: "WIRE ROPE",
      type: 3,
      link: FT_STAINLESS_HARDWEAR + "&childCategoryName=WIRE-ROPE",
    },
    {
      label: "TURNBUCKLE",
      type: 3,
      link: FT_STAINLESS_HARDWEAR + "&childCategoryName=TURNBUCKLE",
    },
  ];
  var FT_STAINLESS_FASTENERS =
    FASTENERS + "&subCategoryName=STAINLESS-FASTENERS";
  var FT_STAINLESS_FASTENERS_3 = [
    { label: "STAINLESS FASTENERS", type: 2, link: FT_STAINLESS_HARDWEAR },
    {
      label: "THREADED ROD",
      type: 3,
      link: FT_STAINLESS_FASTENERS + "&childCategoryName=THREADED-ROD",
    },
    {
      label: "BOLTS",
      type: 3,
      link: FT_STAINLESS_FASTENERS + "&childCategoryName=BOLTS",
    },
    {
      label: "NUTS",
      type: 3,
      link: FT_STAINLESS_FASTENERS + "&childCategoryName=NUTS",
    },
    {
      label: "WASHERS",
      type: 3,
      link: FT_STAINLESS_FASTENERS + "&childCategoryName=WASHERS",
    },
    {
      label: "SCREWS",
      type: 3,
      link: FT_STAINLESS_FASTENERS + "&childCategoryName=SCREWS",
    },
  ];

  var FT_LOW_TENSILE_FASTENERS =
    FASTENERS + "&subCategoryName=LOW-TENSILE-FASTENERS";
  var FT_LOW_TENSILE_FASTENERS_3 = [
    { label: "LOW TENSILE FASTENERS", type: 2, link: FT_LOW_TENSILE_FASTENERS },
    {
      label: "THREADED ROD",
      type: 3,
      link: FT_LOW_TENSILE_FASTENERS + "&childCategoryName=THREADED-ROD",
    },
    {
      label: "U BOLT",
      type: 3,
      link: FT_LOW_TENSILE_FASTENERS + "&childCategoryName=U-BOLT",
    },
    {
      label: "TURNBUCKLE",
      type: 3,
      link: FT_LOW_TENSILE_FASTENERS + "&childCategoryName=TURNBUCKLE",
    },
  ];

  var FT_SCREWS = FASTENERS + "&subCategoryName=SCREWS";
  var FT_SCREWS_3 = [
    { label: "SCREWS", type: 2, link: FT_SCREWS },
    {
      label: "ANCHORS",
      type: 3,
      link: FT_SCREWS + "&childCategoryName=ANCHORS",
    },
    {
      label: "METAL",
      type: 3,
      link: FT_SCREWS + "&childCategoryName=METAL",
    },
    {
      label: "TIMBER",
      type: 3,
      link: FT_SCREWS + "&childCategoryName=TIMBER",
    },
  ];

  var FT_KITS = FASTENERS + "&subCategoryName=KITS";
  var FT_KITS_3 = [
    { label: "KITS", type: 2, link: FT_KITS },
    {
      label: "BOLTS NUTS",
      type: 3,
      link: FT_KITS + "&childCategoryName=BOLTS-NUTS",
    },
    {
      label: "BOLTS NUTS WASHERS",
      type: 3,
      link: FT_KITS + "&childCategoryName=BOLTS-NUTS-WASHERS",
    },
    {
      label: "SOCKET HEAD CAP SCREWS",
      type: 3,
      link: FT_KITS + "&childCategoryName=SOCKET-HEAD-CAP-SCREWS",
    },
    {
      label: "SPLIT PINS",
      type: 3,
      link: FT_KITS + "&childCategoryName=SPLIT-PINS",
    },
    {
      label: "BLIND RIVETS",
      type: 3,
      link: FT_KITS + "&childCategoryName=BLIND-RIVETS",
    },
    {
      label: "SELF DRILLING METAL SCREWS",
      type: 3,
      link: FT_KITS + "&childCategoryName=SELF-DRILLING-METAL-SCREWS",
    },
    {
      label: "SELF TAPPING PAN HEAD",
      type: 3,
      link: FT_KITS + "&childCategoryName=SELF-TAPPING-PAN-HEAD",
    },
  ];
  //#endregion

  /* HAND TOOLS */
  var HAND_TOOLS = "/product-list?categoryName=HAND-TOOLS";
  // #region
  var HAND_TOOLS_1 = [
    {
      label: "FASTENING KITS",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=FASTENING-KITS",
    },
    {
      label: "SOFT STORAGE",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=SOFT-STORAGE",
    },
    {
      label: "HARD STORAGE",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=HARD-STORAGE",
    },
    {
      label: "MEASURING",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=MEASURING",
    },
    {
      label: "LAYOUT",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=LAYOUT",
    },
    {
      label: "PIPE TOOLS WRENCHES",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=PIPE-TOOLS-WRENCHES",
    },
    {
      label: "CUTTING TOOLS",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=CUTTING-TOOLS",
    },
  ];

  var HAND_TOOLS_2 = [
    {
      label: "STRIKING DEMOLITION",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=STRIKING-DEMOLITION",
    },
    {
      label: "CABLE FEEDING",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=CABLE-FEEDING",
    },
    {
      label: "HAND TOOLS KIT",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=HAND-TOOLS-KIT",
    },
  ];
  var HAND_TOOLS_FASTENING = HAND_TOOLS + "&subCategoryName=FASTENING";
  var HAND_TOOLS_FASTENING_3 = [
    { label: "FASTENING", type: 2, link: HAND_TOOLS_FASTENING },
    {
      label: "SPANNERS",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=SPANNERS",
    },
    {
      label: "SCREW DRIVERS",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=SCREW-DRIVERS",
    },
  ];
  var HAND_TOOLS_PLIERS = HAND_TOOLS + "&subCategoryName=PLIERS";
  var HAND_TOOLS_PLIERS_3 = [
    { label: "PLIERS", type: 2, link: HAND_TOOLS_PLIERS },
    {
      label: "LONG NOSE PLIER",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=LONG-NOSE-PLIER",
    },
    {
      label: "PLIERS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=PLIERS",
    },
    {
      label: "SIDE CUTTERS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=SIDE-CUTTERS",
    },
    {
      label: "STRIPPING TOOLS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=STRIPPING-TOOLS",
    },
  ];

  var HAND_TOOLS_KNIVES = HAND_TOOLS + "&subCategoryName=KNIVES";
  var HAND_TOOLS_KNIVES_3 = [
    { label: "KNIVES", type: 2, link: HAND_TOOLS_KNIVES },
    {
      label: "SAFTY KNIVES",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=SAFTY-KNIVES",
    },
    {
      label: "UTILITY KNIVES",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=UTILITY-KNIVES",
    },
    {
      label: "BLADE REPLACEMENT",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=BLADE-REPLACEMENT",
    },
  ];

  //#endregion

  /* POWER TOOLS */
  var POWER_TOOLS = "/product-list?categoryName=POWER-TOOLS";
  // #region
  var POWER_TOOLS_1 = [
    {
      label: "POWER PACKS",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=POWER-PACKS",
    },
    { label: "DRILLS", type: 3, link: POWER_TOOLS + "&subCategoryName=DRILLS" },
    {
      label: "IMPACTS & FASTENING",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=IMPACTS-FASTENING",
    },
    {
      label: "METAL WORKING",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=METAL-WORKING",
    },
  ];

  var POWER_TOOLS_2 = [
    {
      label: "JOBSITE CLEAN UP",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=JOBSITE-CLEAN-UP",
    },
    {
      label: "LIGHTING",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=LIGHTING",
    },
    {
      label: "JOBSITE AUDIO",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=JOBSITE-AUDIO",
    },
    {
      label: "ELECTRICAL",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=ELECTRICAL",
    },
  ];
  var POWER_TOOLS_3 = [
    {
      label: "TEST & MEASURE",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=TEST-MEASURE",
    },
    { label: "LASERS", type: 3, link: POWER_TOOLS + "&subCategoryName=LASERS" },
    {
      label: "SPECIALITY TOOLS",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=SPECIALITY TOOLS",
    },
    {
      label: "BATTERIES & CHARGERS",
      type: 3,
      link: POWER_TOOLS + "&subCategoryName=BATTERIES-CHARGERS",
    },
  ];
  //#endregion

  var ELECTRICAL = "/product-list?categoryName=ELECTRICAL";
  // #region
  var ELECTRICAL_CABLES = {
    label: "CABLES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=CABLES",
  };
  var EC_CONSTRUCTION_CABLES = {
    label: "CONSTRUCTION CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=CONSTRUCTION-CABLES",
  };
  var EC_CC_4 = [
    {
      label: "SINGLE CORE",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=SINGLE-CORE",
    },
    {
      label: "SDI 16MM",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=SDI-16MM",
    },
    {
      label: "FLAT",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=FLAT",
    },
    {
      label: "FLAT 3 CORES",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=FLAT-3-CORES",
    },
    {
      label: "ORANGE CIRCULAR POWER",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=ORANGE-CIRCULAR-POWER",
    },
    {
      label: "XLPE SINGLE CORE, COPPERCONDUCTOR(CU)",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link +
        "&fourCategoryName=XLPE-SINGLE-CORE-COPPERCONDUCTOR",
    },
    {
      label: "XLPE MULTI CORE COPPER",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link +
        "&fourCategoryName=XLPE-MULTI-CORE-COPPER",
    },
  ];

  var EC_INDUSTRIAL_CABLES = {
    label: "INDUSTRIAL CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=INDUSTRIAL-CABLES",
  };
  var EC_IC_4 = [
    {
      label: "FLEXIBLE CABLES",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=FLEXIBLE-CABLES",
    },
    {
      label: "WSD CABLES",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=WSD-CABLES",
    },
    {
      label: "STEEL WIRE AMOURED",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=STEEL-WIRE-AMOURED",
    },
  ];

  var EC_MINING_CABLES = {
    label: "MINING CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=MINING-CABLES",
  };
  var EC_MC_4 = [
    {
      label: "DETONATOR CABLES",
      type: 4,
      link: EC_MINING_CABLES.link + "&fourCategoryName=DETONATOR-CABLES",
    },
  ];

  var EC_SPECIALITY_CABLES = {
    label: "SPECIALITY CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=SPECIALITY-CABLES",
  };
  var EC_SC_4 = [
    {
      label: "SOLAR CABLE - SINGLE OR TWINCORES",
      type: 4,
      link:
        EC_SPECIALITY_CABLES.link +
        "&fourCategoryName=SOLAR-CABLE-SINGLE-OR-TWINCORES",
    },
  ];

  var ELECTRICAL_ENCLOSURES = {
    label: "ENCLOSURES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=ENCLOSURES",
  };
  var EE_WALL_MOUNTED = {
    label: "WALL MOUNTED",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=WALL-MOUNTED",
  };
  var EE_WM_4 = [
    {
      label: "STEEL",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "ALUMINIUM",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=ALUMINIUM",
    },
    {
      label: "GRP",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=GRP",
    },
    {
      label: "ACCESSORIES",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=ACCESSORIES",
    },
  ];

  var EE_SLOPING_ROOF = {
    label: "SLOPING ROOF",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=SLOPING-ROOF",
  };
  var EE_SR_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "STEELHD",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEELHD",
    },
    {
      label: "STAINLESS STEELHD",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STAINLESS-STEELHD",
    },
    {
      label: "STEEL WITH SUN SHIELDS",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEEL-WITH-SUN-SHIELDS",
    },
  ];

  var EE_FLOOR_STANDING = {
    label: "FLOOR STANDING",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=FLOOR-STANDING",
  };
  var EE_FS_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "ACCESSORIES",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=ACCESSORIES",
    },
  ];

  var EE_COMBINATIONS = {
    label: "COMBINATIONS",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=COMBINATIONS",
  };

  var EE_BATTERY_CABINET = {
    label: "BATTERY CABINET",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=BATTERY-CABINET",
  };
  //#endregion

  /* ACCESSORIES */
  // var ACCESSORIES = "/product-list?categoryName=ACCESSORIES";
  // // #region
  // var ACCESSORIES_1 = [
  //   {
  //     label: "FIBRE DISCS",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=FIBRE-DISCS",
  //   },
  //   {
  //     label: "DRILLING",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=DRILLING",
  //   },
  //   {
  //     label: "SDS DRILL BITS FOR MASONRY",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=SDS-DRILL-BITS-FOR-MASONRY",
  //   },
  //   {
  //     label: "CUTTING DISCS",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=UTTING-DISCS",
  //   },
  // ];
  // var ACCESSORIES_2 = [
  //   {
  //     label: "LINISHING BELTS & DISCS",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=LINISHING-BELTS-DISCS",
  //   },
  //   {
  //     label: "GRINDING WHEELS",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=GRINDING-WHEELS",
  //   },
  //   {
  //     label: "MULTI TOOL BLADES",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=MULTI-TOOL-BLADES",
  //   },
  //   {
  //     label: "FLAP WHEELS",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=FLAP-WHEELS",
  //   },
  // ];
  // var ACCESSORIES_3 = [
  //   {
  //     label: "CUTTING BLADES",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=CUTTING-BLADES",
  //   },
  //   {
  //     label: "HOLE SAWS",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=HOLE-SAWS",
  //   },
  //   {
  //     label: "CONCRETE DRILLINGS",
  //     type: 3,
  //     link: ACCESSORIES + "&subCategoryName=CONCRETE-DRILLINGS",
  //   },
  // ];
  // //#endregion

  var INDUSTRIAL = "/product-list?categoryName=INDUSTRIAL";
  // #region
  var INDUSTRIAL_ABRASIVES_CUTTING = INDUSTRIAL + "&subCategoryName=ABRASIVES-CUTTING";
  var INDUSTRIAL_1 = [
    { label: "ABRASIVES & CUTTING", type: 2, link: INDUSTRIAL_ABRASIVES_CUTTING },
    {
      label: "BELTS",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BELTS",
    },
    {
      label: "DISCS",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=DISCS",
    },
    {
      label: "BONDED",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BONDED",
    },
    {
      label: "BRUSHES",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BRUSHES",
    },
    {
      label: "POLISHING & FINISHING",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=POLISHING-FINISHING",
    },
    {
      label: "SANDING",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=SANDING",
    },
    {
      label: "SURFACE CONDITIONING",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=SURFACE-CONDITIONING",
    },
  ];
  var INDUSTRIAL_DRILLING = INDUSTRIAL + "&subCategoryName=DRILLING";
  var INDUSTRIAL_2 = [
    { label: "DRILLING", type: 2, link: INDUSTRIAL_DRILLING },
    {
      label: "DRILL BITS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=DRILL-BITS",
    },
    {
      label: "DRILL SETS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=DRILL-SETS",
    },
  ];
  var INDUSTRIAL_LUBRICATION_EQUIPMENT = INDUSTRIAL + "&subCategoryName=LUBRICATION-EQUIPMENT";
  var INDUSTRIAL_3 = [
    { label: "LUBRICATION & EQUIPMENT", type: 2, link: INDUSTRIAL_LUBRICATION_EQUIPMENT },
    {
      label: "GENERAL",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=GENERAL",
    },
    {
      label: "ANTI-SIEZE",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=ANTI-SIEZE",
    },
    {
      label: "CLEANERS & DISPERSANTS",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=CLEANERS-DISPERSANTS",
    },
    {
      label: "CUTTING FLUIDS",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=CUTTING-FLUIDS",
    },
    {
      label: "GREASES",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=GREASES",
    },
  ];
  var INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES = INDUSTRIAL + "&subCategoryName=PAINT-EQUIPMENT-SUPPLIES";
  var INDUSTRIAL_4 = [
    { label: "PAINT,EQUIPMENT & SUPPLIES", type: 2, link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES },
    {
      label: "MARKING PAINT",
      type: 3,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=MARKING-PAINT",
    },
    {
      label: "AUTOMOTIVE",
      type: 3,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=AUTOMOTIVE",
    },
    {
      label: "AEROSOLS",
      type: 3,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=AEROSOLS",
    },
  ];
  var INDUSTRIAL_PUMPS_VALVES_PARTS = INDUSTRIAL + "&subCategoryName=PUMPS-VALVES-PARTS";
  var INDUSTRIAL_5 = [
    { label: "PUMPS,VALVES & PARTS", type: 2, link: INDUSTRIAL_PUMPS_VALVES_PARTS },
    {
      label: "FITTINGS & PARTS",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=FITTINGS-PARTS",
    },
    {
      label: "VALVES",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=VALVES",
    },
  ];
  var INDUSTRIAL_HOSES_FITTINGS = INDUSTRIAL + "&subCategoryName=HOSES-FITTINGS";
  var INDUSTRIAL_6 = [
    { label: "HOSES & FITTINGS", type: 2, link: INDUSTRIAL_HOSES_FITTINGS },
    {
      label: "AIR & WATER HOSE",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=AIR-WATER-HOSE",
    },
    {
      label: "AIR LINE FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=AIR-LINE-FITTINGS",
    },
    {
      label: "HOSE CLAMPS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-CLAMPS",
    },
    {
      label: "HOSE FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-FITTINGS",
    },
    {
      label: "HOSE REELS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-REELS",
    },
    {
      label: "VALVES",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=VALVES",
    },
    {
      label: "THREADED FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=THREADED-FITTINGS",
    },
  ];

  console.log(EC_CONSTRUCTION_CABLES);
  const location = useLocation();

  return (
    <Navbar
      className="nav_bgc w-100"/* {
        location.pathname === "/login"
          ? "loginHide nav_bgc w-100"
          : "nav_bgc w-100"
      } */
      expand="lg"
    >
      <Container className="w-100 navb" fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 Navb_full">
          {/* ************   Mega Menu  ***************  */}
          <Nav className="w3c_nav">
            {/* home icon */}
            <Nav.Link className="nav_c home_ic" href="/">
              <i className="bi bi-house-fill"></i>
            </Nav.Link>

            {/* BRANDS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href="/product-list">BRANDS</a>
              </div>
              <div className="dropdown-content-brand">
                {BRANDS.map((item) => {
                  return (
                    <div className="img_hvf">
                      <a key={item.link} href={item.link}>
                        <img
                          className="brand_img"
                          src={item.Brand_Logo}
                          alt=""
                        />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PPE */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={PPE}>PPE</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {PPE_HEADWEAR3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {PPE_HEARING3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_HYDRATION3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {PPE_EYE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_RESPIRATORY3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_HAND3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {PPE_WORKWEAR3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_SUN3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_FACE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_DISPOSABLE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* SITE SAFETY */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={SITE_SAFETY}>SITE SAFETY</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {SS_SPILL_KITS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_FIRST_AID3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {SS_SPILL_CONTAINMENT3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_ACCESSORIES3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {SS_SHORES_EYEWASH3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_DG_CABINETS3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* FASTENERS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={FASTENERS}>FASTENERS</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {FT_HIGH_TENSILE_FASTENERS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {FT_STAINLESS_HARDWEAR_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {FT_KITS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {FT_STAINLESS_FASTENERS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {FT_LOW_TENSILE_FASTENERS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {FT_SCREWS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* HAND TOOLS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={HAND_TOOLS}>HAND TOOLS</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {HAND_TOOLS_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {HAND_TOOLS_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {HAND_TOOLS_FASTENING_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {HAND_TOOLS_PLIERS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {HAND_TOOLS_KNIVES_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* ACCESSORIES */}
            {/* <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={ACCESSORIES}>ACCESSORIES</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {ACCESSORIES_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {ACCESSORIES_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {ACCESSORIES_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div> */}

            {/* INDUSTRIAL */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={INDUSTRIAL}>INDUSTRIAL</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {INDUSTRIAL_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">

                    {INDUSTRIAL_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_4.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">

                    {INDUSTRIAL_5.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_6.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* POWER TOOLS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={POWER_TOOLS}>POWER TOOLS</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {POWER_TOOLS_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {POWER_TOOLS_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {POWER_TOOLS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* MECHANICAL
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href="/product-list/category/ELECTRICAL">MECHANICAL</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    <li>
                      <a href="/product-list">Link1</a>
                    </li>
                    <li>
                      <a href="/product-list">Link2</a>
                    </li>
                    <li>
                      <a href="/product-list">Link3</a>
                    </li>
                  </ul>
                  <ul className="column">
                    <li>
                      <a href="/product-list">Link1</a>
                    </li>
                    <li>
                      <a href="/product-list">Link2</a>
                    </li>
                    <li>
                      <a href="/product-list">Link3</a>
                    </li>
                  </ul>
                  <ul className="column">
                    <li>
                      <a href="/product-list">Link1</a>
                    </li>
                    <li>
                      <a href="/product-list">Link2</a>
                    </li>
                    <li>
                      <a href="/product-list">Link3</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}



            {/* ELECTRICAL */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={ELECTRICAL}>ELECTRICAL</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {/* CABLES */}
                    <li className="subCat">
                      <a href={ELECTRICAL_CABLES.link}>
                        {ELECTRICAL_CABLES.label}
                      </a>
                    </li>
                    <li className="parent childCat">
                      <a className="parentA" href={EC_CONSTRUCTION_CABLES.link}>
                        {EC_CONSTRUCTION_CABLES.label}
                        <span className="expand ms-2"> »</span>
                      </a>
                      <ul className="child">
                        {EC_CC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <br />
                    <li className="parent childCat">
                      <a className="parentA" href={EC_INDUSTRIAL_CABLES.link}>
                        {EC_INDUSTRIAL_CABLES.label}
                        <span className="expand ms-2">»</span>
                      </a>
                      <ul className="child">
                        {EC_IC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>
                                {item.label}{" "}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EC_MINING_CABLES.link}>
                        {EC_MINING_CABLES.label}
                        <span className="expand ms-2">»</span>
                      </a>
                      <ul className="child">
                        {EC_MC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EC_SPECIALITY_CABLES.link}>
                        {EC_SPECIALITY_CABLES.label}
                        <span className="expand ms-2">»</span>
                      </a>
                      <ul className="child">
                        {EC_SC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>

                  <ul className="column">
                    {/* ENCLOSURES */}
                    <li className="subCat">
                      <a href={ELECTRICAL_ENCLOSURES.link}>
                        {ELECTRICAL_ENCLOSURES.label}
                      </a>
                    </li>
                    <li className="parent childCat">
                      <a className="parentA" href={EE_WALL_MOUNTED.link}>
                        {EE_WALL_MOUNTED.label}
                        <span className="expand ms-2"> »</span>
                      </a>
                      <ul className="child">
                        {EE_WM_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <br />
                    <li className="parent childCat">
                      <a className="parentA" href={EE_SLOPING_ROOF.link}>
                        {EE_SLOPING_ROOF.label}
                        <span className="expand ms-2">»</span>
                      </a>
                      <ul className="child">
                        {EE_SR_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>
                                {item.label}{" "}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EE_FLOOR_STANDING.link}>
                        {EE_FLOOR_STANDING.label}
                        <span className="expand ms-2">»</span>
                      </a>
                      <ul className="child">
                        {EE_FS_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>

                  <ul className="column">
                    <li className="childCat">
                      <a className="parentA" href={EE_COMBINATIONS.link}>
                        {EE_COMBINATIONS.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>

                    <li className="childCat">
                      <a className="parentA" href={EE_BATTERY_CABINET.link}>
                        {EE_BATTERY_CABINET.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navb;
