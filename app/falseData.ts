export const products = [
  {
    id: 1,
    name: "Faux fur jacket",
    price: 59.9,
    desc: "Faux fur jacket with a lapel collar, pockets and double-breasted button fastening.",
    availableItems: [
      {
        color: "Red",
        size: "Small",
        stock: 14,
      },
      {
        color: "Red",
        size: "Medium",
        stock: 15,
      },
      {
        color: "Red",
        size: "Large",
        stock: 4,
      },
      {
        color: "Black",
        size: "Small",
        stock: 16,
      },
      {
        color: "Black",
        size: "Medium",
        stock: 10,
      },
      {
        color: "Black",
        size: "Large",
        stock: 0,
      },
    ],
    images: [
      {
        color: "Red",
        urls: [
          "https://static.pullandbear.net/assets/public/dd64/8a1f/dc4f4200b4ad/1dff31c71698/07751307791-A1M/07751307791-A1M.jpg",
          "https://static.pullandbear.net/assets/public/0a82/48cb/c40c4f4b8ebc/11ef6550bcb3/07751307791-A2M/07751307791-A2M.jpg",
          "https://static.pullandbear.net/assets/public/d146/d5fa/ba354f0bb10d/c6f8e62fbf24/07751307791-A3M/07751307791-A3M.jpg",
          "https://static.pullandbear.net/assets/public/f2fa/7b90/d4e04c4e8688/6c6fb1f3d8b2/07751307791-A4M/07751307791-A4M.jpg",
        ],
      },
      {
        color: "Black",
        urls: [
          "https://static.pullandbear.net/assets/public/546e/f93e/1bbd455c91bf/8a5f7b1001ec/07751407800-A1M/07751407800-A1M.jpg",
          "https://static.pullandbear.net/assets/public/f464/5a9a/38e84bc48dbd/8665adc3011a/07751407800-A2M/07751407800-A2M.jpg",
          "https://static.pullandbear.net/assets/public/093a/2e7f/33424b2d8934/f759c7fd0e40/07751407800-A3M/07751407800-A3M.jpg",
          "https://static.pullandbear.net/assets/public/2a57/cec6/6b9b49d2a2af/3d6db13a9d31/07751407800-A4M/07751407800-A4M.jpg",
        ],
      },
    ],
    categories: ["jacket", "top"],
    slug: "faux-fur-jacket",
  },
  {
    id: 2,
    name: "Oversize sweater",
    price: 45.9,
    desc: "Soft knit drop-shoulder sweater with a crew neck. Made of felt texture fabric.",
    categories: ["sweatshirt", "top"],
    slug: "oversize-sweater",
    availableItems: [
      {
        size: "Small",
        color: "Grey",
        stock: 9,
      },
      {
        size: "Large",
        color: "Grey",
        stock: 6,
      },
      {
        size: "Medium",
        color: "Brown",
        stock: 8,
      },
      {
        size: "Small",
        color: "Brown",
        stock: 20,
      },
      {
        size: "Large",
        color: "Blue",
        stock: 10,
      },
    ],
    images: [
      {
        color: "Grey",
        urls: [
          "https://static.pullandbear.net/assets/public/6cfb/c3c9/1be74245af53/7036cf2796f4/07554305803-A1M/07554305803-A1M.jpg",
          "https://static.pullandbear.net/assets/public/a89f/f65a/c6444e8ebf98/b6be5e1d97cf/07554305803-A2M/07554305803-A2M.jpg",
          "https://static.pullandbear.net/assets/public/3a83/46d3/0c71461a9b5c/731132a69d06/07554305803-A3M/07554305803-A3M.jpg",
          "https://static.pullandbear.net/assets/public/1616/a9e0/e1844282adf3/d704f8d898cb/07554305803-A4M/07554305803-A4M.jpg",
        ],
      },
      {
        color: "Brown",
        urls: [
          "https://static.pullandbear.net/assets/public/1921/70f4/4bd14fe8bf6c/5f0bd60926bc/07554405716-A1M/07554405716-A1M.jpg",
          "https://static.pullandbear.net/assets/public/9050/6cb9/609f412c8a2d/64667fc7e280/07554405716-A2M/07554405716-A2M.jpg",
          "https://static.pullandbear.net/assets/public/ea87/2697/92e642309d55/952cfa2ec826/07554405716-A3M/07554405716-A3M.jpg",
          "https://static.pullandbear.net/assets/public/8e83/87db/1a6945cc8a05/663bbbbdb5bc/07554405716-A4M/07554405716-A4M.jpg",
        ],
      },
      {
        color: "Blue",
        urls: [
          "https://static.pullandbear.net/assets/public/4b74/0f56/f95f4dd79450/aeea25a6da46/07554305430-A1M/07554305430-A1M.jpg",
          "https://static.pullandbear.net/assets/public/488f/6d29/e6dc468a9525/65460f1e46b3/07554305430-A2M/07554305430-A2M.jpg",
          "https://static.pullandbear.net/assets/public/1d1a/97ae/c83340b0b2bf/a72c4bffbe5f/07554305430-A3M/07554305430-A3M.jpg",
          "https://static.pullandbear.net/assets/public/a2a3/56bd/87104676889e/10b062266b16/07554305430-A4M/07554305430-A4M.jpg",
        ],
      },
    ],
  },
];

export let cartItems: {
  id: number;
  name: string;
  price: number;
  color: string;
  amount: number;
  image: string;
}[] = [];
