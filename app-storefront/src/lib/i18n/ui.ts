/**
 * UI string translations for functional interface elements.
 * For editorial content (product tabs, page sections) see Sanity.
 */

type Lang = "en" | "lv"

const ui = {
  // Cart
  cart: { en: "Cart", lv: "Grozs" },
  cartEmpty: {
    en: "You don't have anything in your cart. Let's change that, use the link below to start browsing our products.",
    lv: "Jūsu grozs ir tukšs. Izmantojiet zemāk esošo saiti, lai pārlūkotu mūsu produktus.",
  },
  exploreProducts: { en: "Explore products", lv: "Aplūkot produktus" },
  goToCheckout: { en: "Go to checkout", lv: "Uz norēķinu" },
  summary: { en: "Summary", lv: "Kopsavilkums" },
  subtotal: { en: "Subtotal", lv: "Starpsumma" },
  shipping: { en: "Shipping", lv: "Piegāde" },
  discount: { en: "Discount", lv: "Atlaide" },
  taxes: { en: "Taxes", lv: "Nodokļi" },
  total: { en: "Total", lv: "Kopā" },
  signInPrompt: { en: "Already have an account?", lv: "Jau ir konts?" },
  signInBetter: { en: "Sign in for a better experience.", lv: "Pierakstieties ērtākai pieredze." },

  // Product actions
  addToCart: { en: "Add to cart", lv: "Pievienot grozam" },
  outOfStock: { en: "Out of stock", lv: "Nav noliktavā" },
  selectVariant: { en: "Select variant", lv: "Izvēlēties variantu" },

  // Sort
  sortBy: { en: "Sort by", lv: "Kārtot pēc" },
  sortLatest: { en: "Latest arrivals", lv: "Jaunākie" },
  sortPriceLow: { en: "Price: Low → High", lv: "Cena: zemākā → augstākā" },
  sortPriceHigh: { en: "Price: High → Low", lv: "Cena: augstākā → zemākā" },

  // Checkout
  shippingAddress: { en: "Shipping Address", lv: "Piegādes adrese" },
  billingAddress: { en: "Billing address", lv: "Norēķinu adrese" },
  billingSameAsShipping: { en: "Billing address same as shipping address", lv: "Norēķinu adrese sakrīt ar piegādes adresi" },
  continueToDelivery: { en: "Continue to delivery", lv: "Turpināt uz piegādi" },
  continueToPayment: { en: "Continue to payment", lv: "Turpināt uz maksājumu" },
  continueToReview: { en: "Continue to review", lv: "Turpināt uz pārskatīšanu" },
  placeOrder: { en: "Place order", lv: "Veikt pasūtījumu" },
  delivery: { en: "Delivery", lv: "Piegāde" },
  payment: { en: "Payment", lv: "Maksājums" },
  review: { en: "Review", lv: "Pārskatīšana" },
  edit: { en: "Edit", lv: "Rediģēt" },
  firstName: { en: "First name", lv: "Vārds" },
  lastName: { en: "Last name", lv: "Uzvārds" },
  email: { en: "Email", lv: "E-pasts" },
  phone: { en: "Phone", lv: "Tālrunis" },
  address: { en: "Address", lv: "Adrese" },
  company: { en: "Company", lv: "Uzņēmums" },
  postalCode: { en: "Postal code", lv: "Pasta indekss" },
  city: { en: "City", lv: "Pilsēta" },
  country: { en: "Country", lv: "Valsts" },
  stateProvince: { en: "State / Province", lv: "Apgabals / Province" },

  // Auth
  welcomeBack: { en: "Welcome back", lv: "Laipni lūdzam atpakaļ" },
  signIn: { en: "Sign in", lv: "Pierakstīties" },
  notAMember: { en: "Not a member?", lv: "Nav konta?" },
  joinUs: { en: "Join us", lv: "Pievienoties" },
  alreadyMember: { en: "Already a member?", lv: "Jau ir konts?" },
  join: { en: "Join", lv: "Reģistrēties" },
  password: { en: "Password", lv: "Parole" },

  // Account
  account: { en: "Account", lv: "Konts" },
  profile: { en: "Profile", lv: "Profils" },
  addresses: { en: "Addresses", lv: "Adreses" },
  orders: { en: "Orders", lv: "Pasūtījumi" },
  logOut: { en: "Log out", lv: "Izrakstīties" },
  overview: { en: "Overview", lv: "Pārskats" },
  saveChanges: { en: "Save changes", lv: "Saglabāt izmaiņas" },
  cancel: { en: "Cancel", lv: "Atcelt" },

  // Orders
  orderConfirmed: { en: "Thank you!", lv: "Paldies!" },
  orderPlaced: { en: "Your order was placed successfully.", lv: "Jūsu pasūtījums ir veiksmīgi noformēts." },
  orderDate: { en: "Order date:", lv: "Pasūtījuma datums:" },
  orderNumber: { en: "Order number:", lv: "Pasūtījuma numurs:" },
  orderStatus: { en: "Order status:", lv: "Pasūtījuma statuss:" },
  paymentStatus: { en: "Payment status:", lv: "Maksājuma statuss:" },
  needHelp: { en: "Need help?", lv: "Nepieciešama palīdzība?" },
  contact: { en: "Contact", lv: "Sazināties" },
  returnsExchanges: { en: "Returns & Exchanges", lv: "Atgriešana un apmaiņa" },

  // Rights reserved
  allRightsReserved: { en: "All rights reserved.", lv: "Visas tiesības aizsargātas." },
}

export type UIKey = keyof typeof ui

export function t(key: UIKey, lang: string): string {
  const l = (lang.split("-")[0].toLowerCase() === "lv" ? "lv" : "en") as Lang
  return ui[key][l]
}

export default ui
