import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { mapNightTheme, mapDarkTheme } from '../../ui/shared/MapTheme';

export default function Map() {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapNightTheme}
      initialRegion={{
        latitude: 25.0976,
        longitude: 55.1631,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
      showsUserLocation
      // showsMyLocationButton
      style={{ flex: 1 }}
    >
      <Marker coordinate={{ latitude: 25.0976, longitude: 55.1631 }} />
    </MapView>
  );
}
