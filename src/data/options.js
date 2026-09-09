export const options = {
    carats: [
        { name: "1 ct", conv: 1, img: "/1-carat.svg" },
        { name: "2 ct", conv: 2, img: "/2-carat.svg" },
        { name: "2½ ct", conv: '2_5', img: "/2-carat.svg" },
        { name: "3 ct", conv: 3, img: "/3-carat.svg" }
    ],
    shapes: [
        { name: "Round", conv: "R", img: "/round.svg" },
        { name: "Oval", conv: "O", img: "/oval.svg" },
        { name: "Emerald", conv: "E", img: "/emerald.svg" },
        { name: "Radiant", conv: "RD", img: "/radiant.svg" },
        { name: "Cushion", conv: "C", img: "/cushion.svg" },
        { name: "Pear", conv: "P", img: "/pear.svg" },
        { name: "Marquise", conv: "M", img: "/marquise.svg" }
    ],
    shankTypes: [
        { name: "Slim", conv: 150, img: "/slim.svg" },
        { name: "Classic", conv: 180, img: "/classic.svg" },
        { name: "Bold", conv: 210, img: "/bold.svg" },
        { name: "Grand", conv: 250, img: "/grand.svg" },
    ],
    headTypes: [
        { name: "Classic", conv: "CL", img: "/classic.svg" },
        { name: "Hidden Halo", conv: "HH", img: "/hidden-halo.svg" }
    ],
    hasQuilt: true,
    metalTypes: {
        "14K": {
            "shank": [
                { name: "White Gold", conv: "W", img: "/white-gold.webp" },
                { name: "Yellow Gold", conv: "Y", img: "/yellow-gold.webp" },
                { name: "Rose Gold", conv: "R", img: "/rose-gold.webp" }
            ],
            "head": [
                { name: "White Gold", conv: "W", img: "/white-gold.webp" },
                { name: "Yellow Gold", conv: "Y", img: "/yellow-gold.webp" },
                { name: "Rose Gold", conv: "R", img: "/rose-gold.webp" }
            ],
            "quilt": [
                { name: "White Gold", conv: "W", img: "/white-gold.webp" },
                { name: "Yellow Gold", conv: "Y", img: "/yellow-gold.webp" },
                { name: "Rose Gold", conv: "R", img: "/rose-gold.webp" }
            ],
        },
        "18K": {
            "shank": [
                { name: "White Gold", conv: "W", img: "/white-gold.webp" },
                { name: "Yellow Gold", conv: "Y", img: "/yellow-gold.webp" },
                { name: "Rose Gold", conv: "R", img: "/rose-gold.webp" }
            ],
            "head": [
                { name: "White Gold", conv: "W", img: "/white-gold.webp" },
                { name: "Yellow Gold", conv: "Y", img: "/yellow-gold.webp" },
                { name: "Rose Gold", conv: "R", img: "/rose-gold.webp" }
            ],
            "quilt": [
                { name: "White Gold", conv: "W", img: "/white-gold.webp" },
                { name: "Yellow Gold", conv: "Y", img: "/yellow-gold.webp" },
                { name: "Rose Gold", conv: "R", img: "/rose-gold.webp" }
            ],
        },
        "PLATINUM": {
            "shank": [
                { name: "White", conv: "W", img: "/white-gold.webp" },
            ],
            "head": [
                { name: "White", conv: "W", img: "/white-gold.webp" },
            ],
            "quilt": [
                { name: "White", conv: "W", img: "/white-gold.webp" },
            ],
        }
    },
    ringSizes: [
        { name: "US 4", conv: "4" },
        { name: "US 4.5", conv: "4.5" },
        { name: "US 5", conv: "5" },
        { name: "US 5.5", conv: "5.5" },
        { name: "US 6", conv: "6" },
        { name: "US 6.5", conv: "6.5" },
        { name: "US 7", conv: "7" },
    ],
    engravingFonts: [
        { name: "Arial", conv: "Arial", class: 'arial-font-style' },
        { name: "Courier", conv: "Courier", class: 'courier-font-style' },
        { name: "Great Vibes", conv: "Great-Vibes", class: 'great-vibes-font-style' },
    ],
    excludes: {
        "shape-C": { carats: [ '2_5' ] },
    }
}