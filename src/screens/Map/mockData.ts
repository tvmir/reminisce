import { Image } from 'react-native';

// @ts-ignore
import Img1 from '../../../assets/imgt1.jpeg';
// @ts-ignore
import Img2 from '../../../assets/imgt2.jpeg';
// @ts-ignore
import Img3 from '../../../assets/imgt3.jpeg';
// @ts-ignore
import Img4 from '../../../assets/imgt4.jpeg';

const IMG1 = Image.resolveAssetSource(Img1).uri;
const IMG2 = Image.resolveAssetSource(Img2).uri;
const IMG3 = Image.resolveAssetSource(Img3).uri;
const IMG4 = Image.resolveAssetSource(Img4).uri;

const IMAGES = [IMG1, IMG2, IMG3, IMG4];

// Will remove this once locations are integrated in the app
export const markers = [
  {
    coordinates: {
      latitude: 25.098960013248654,
      longitude: 55.17555855061869,
    },
    title: 'NYC DUMP',
    user: 'jess',
    image: IMAGES[0],
  },
  {
    coordinates: {
      latitude: 25.10960013248654,
      longitude: 55.16855855061869,
    },
    title: 'Euphoria',
    user: 'jess',
    image: IMAGES[1],
  },
  {
    coordinates: {
      latitude: 25.08960013248654,
      longitude: 55.18355855061869,
    },
    title: 'Car Collection',
    user: 'teej',
    image: IMAGES[2],
  },
  {
    coordinates: {
      latitude: 25.08960013248654,
      longitude: 55.16555855061869,
    },
    title: 'Car Collection in NYC',
    user: 'teej',
    image: IMAGES[3],
  },
];
