function getCategoryImageSource(category) {
  switch (category) {
    case "Concerts":
      return "https://d3vzzcunewy153.cloudfront.net/img/17f95c00-4ab0-492d-94a6-3a647e5ea2fe/fc72f93fce436749f41736b8ad0c0bad.jpg";

    case "Nightlife":
      return "https://d3vzzcunewy153.cloudfront.net/img/17f95c00-4ab0-492d-94a6-3a647e5ea2fe/24c3ba51127146184c9e9b8238cd1c5f.jpg";

    case "Art & Theatre":
      return "https://d3vzzcunewy153.cloudfront.net/img/17f95c00-4ab0-492d-94a6-3a647e5ea2fe/fea254191bf385503a6b23d28dbcd28b.jpg";

    case "Comedy":
      return "https://d3vzzcunewy153.cloudfront.net/img/17f95c00-4ab0-492d-94a6-3a647e5ea2fe/7843b1e81244ed6c70cb8da7104c0267.jpg";

    case "Festival":
      return "https://d3vzzcunewy153.cloudfront.net/img/17f95c00-4ab0-492d-94a6-3a647e5ea2fe/0e2973ff276027c62b10a34ef32e29bb.jpg";

    case "Activities":
      return "https://d3vzzcunewy153.cloudfront.net/img/17f95c00-4ab0-492d-94a6-3a647e5ea2fe/fea254191bf385503a6b23d28dbcd28b.jpg";

    case "Other":
      break;

    default:
      break;
  }
}

export default getCategoryImageSource;
