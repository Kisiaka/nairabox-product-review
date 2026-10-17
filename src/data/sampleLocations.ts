import { StateLocation } from '../types';

export const NIGERIAN_LOCATIONS: StateLocation[] = [
  {
    id: 'lagos',
    state: 'Lagos',
    shortName: 'Lagos',
    capital: 'Ikeja',
    neighbourhoods: [
      {
        id: 'ikeja',
        name: 'Ikeja',
        popularVenues: ['Ikeja City Mall (Silverbird)', 'Maryland Mall (Genesis)', 'Alausa Auditorium', 'Airport Hotel Lounge'],
        areaType: 'Mainland',
      },
      {
        id: 'lekki',
        name: 'Lekki',
        popularVenues: ['Filmhouse IMAX Lekki', 'Circle Mall (Genesis)', 'Wave Beach Elegushi', 'Upbeat Recreation Centre'],
        areaType: 'Island',
      },
      {
        id: 'vi',
        name: 'Victoria Island',
        popularVenues: ['Eko Hotel & Suites Convention Centre', 'Terra Kulture Arena', 'Landmark Event Centre', 'The Palms Mall (Genesis)'],
        areaType: 'Island',
      },
      {
        id: 'yaba',
        name: 'Yaba',
        popularVenues: ['CcHUB Technology Center', 'UNILAG Indoor Sports Hall', 'Ozone Cinemas Sabo', 'Commercial Avenue Open Grounds'],
        areaType: 'Mainland',
      },
      {
        id: 'agege',
        name: 'Agege',
        popularVenues: ['Pen Cinema Agege Axis', 'Agege Stadium Event Grounds', 'Dairy Farm Community Pavilion', 'Capitol Road Event Hub'],
        areaType: 'Mainland',
      },
      {
        id: 'ikorodu',
        name: 'Ikorodu',
        popularVenues: ['Ikorodu Town Hall Arena', 'Agric Cinema & Recreational Hub', 'Laspotech Amphitheatre', 'Ebute Waterfront Grounds'],
        areaType: 'Mainland',
      },
      {
        id: 'surulere',
        name: 'Surulere',
        popularVenues: ['National Stadium Indoor Hall', 'Adeniran Ogunsanya Mall (Filmhouse)', 'Teslim Balogun Stadium Area'],
        areaType: 'Mainland',
      },
      {
        id: 'ikoyi',
        name: 'Ikoyi',
        popularVenues: ['Ikoyi Club 1938 Events Lawn', 'Wheatbaker Hotel Gallery', 'Osborne Waterfront Gardens'],
        areaType: 'Island',
      },
    ],
  },
  {
    id: 'abuja',
    state: 'Federal Capital Territory (Abuja)',
    shortName: 'Abuja (FCT)',
    capital: 'Abuja',
    neighbourhoods: [
      {
        id: 'wuse',
        name: 'Wuse',
        popularVenues: ['Silverbird Entertainment Centre', 'Wuse II Open Arena', 'Aminu Kano Event Pavilion'],
        areaType: 'Central',
      },
      {
        id: 'maitama',
        name: 'Maitama',
        popularVenues: ['Transcorp Hilton Congress Hall', 'Millennium Park Amphitheatre', 'Farmers Market Arts Space'],
        areaType: 'Central',
      },
      {
        id: 'garki',
        name: 'Garki',
        popularVenues: ['International Conference Centre (ICC)', 'Area 11 Arts Pavilion'],
        areaType: 'Central',
      },
      {
        id: 'jabi',
        name: 'Jabi',
        popularVenues: ['Silverbird Cinemas Jabi Lake Mall', 'Jabi Boat Club Gardens'],
        areaType: 'Central',
      },
    ],
  },
  {
    id: 'rivers',
    state: 'Rivers',
    shortName: 'Port Harcourt',
    capital: 'Port Harcourt',
    neighbourhoods: [
      {
        id: 'ph_gra',
        name: 'Old GRA / New GRA',
        popularVenues: ['The Atrium Event Centre', 'Port Harcourt Pleasure Park', 'Genesis Deluxe Cinemas Tombia'],
        areaType: 'Metropolitan',
      },
      {
        id: 'trans_amadi',
        name: 'Trans-Amadi',
        popularVenues: ['Rivers State Cultural Centre', 'Industrial Layout Expo Hub'],
        areaType: 'Metropolitan',
      },
    ],
  },
  {
    id: 'kano',
    state: 'Kano',
    shortName: 'Kano',
    capital: 'Kano',
    neighbourhoods: [
      {
        id: 'sabo_gerri',
        name: 'Sabo Gerri',
        popularVenues: ['Sabo Gerri Cultural Pavilion', 'France Road Arts & Music Arena', 'Ballat Hughes Event Hall'],
        areaType: 'Metropolitan',
      },
      {
        id: 'emir_mall',
        name: 'Emir Mall (FilmOne Cinema)',
        popularVenues: ['FilmOne Cinema Emir Mall', 'Emir Mall Central Atrium', 'Ahmadu Bello Way Cinema Arcade'],
        areaType: 'Metropolitan',
      },
    ],
  },
  {
    id: 'oyo',
    state: 'Oyo',
    shortName: 'Ibadan',
    capital: 'Ibadan',
    neighbourhoods: [
      {
        id: 'bodija',
        name: 'Bodija',
        popularVenues: ['Ventura Mall Cinemas', 'University of Ibadan Arts Theatre'],
        areaType: 'Metropolitan',
      },
      {
        id: 'ring_road',
        name: 'Ring Road',
        popularVenues: ['Palms Mall Ring Road (Filmhouse)', 'Heritage Hall Event Grounds'],
        areaType: 'Metropolitan',
      },
    ],
  },
];
