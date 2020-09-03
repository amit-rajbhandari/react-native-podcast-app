import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export default function useDimension() {
  const [dimensionData, setDimensionData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = result => {
      setDimensionData(result.window);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...dimensionData,
  };
}
