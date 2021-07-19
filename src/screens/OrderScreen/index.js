import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import OrderMap from '../../components/OrderMap';
import {useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {getOrder, getCar} from '../../graphql/queries';
import {onOrderUpdated, onCarUpdated} from './subscription';

const OrderScreen = () => {
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);

  const route = useRoute();

  //Fetch order on initial render

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await API.graphql(
          graphqlOperation(getOrder, {
            id: route.params.id,
          }),
        );
        setOrder(orderData.data.getOrder);
      } catch (e) {}
    };
    fetchOrder();
  }, []);

  // subscribe to order update.
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onOrderUpdated, {
        id: route.params.id,
      }).subscribe({
        next: ({value}) => setOrder(value.data.onOrderUpdated),
        error: error => console.warn(error),
      }),
    );

    return () => subscription.unsubscribe();
  }, [order]);

  // When order is updated
  useEffect(() => {
    if (!order?.carId || order.carId === '1') {
      return;
    }
    const fetchCar = async () => {
      try {
        const carData = await API.graphql(
          graphqlOperation(getCar, {
            id: order.carId,
          }),
        );
        setCar(carData.data.getCar);
      } catch (e) {}
    };
    fetchCar();
  }, [order]);

  // subscribe to car update
  useEffect(() => {
    if (!order?.carId || order.carId === '1') {
      return;
    }
    const subscription = API.graphql(
      graphqlOperation(onCarUpdated, {
        id: order.carId,
      }).subscribe({
        next: ({value}) => setCar(value.data.onCarUpdated),
        error: error => console.warn(error),
      }),
    );

    return () => subscription.unsubscribe();
  }, [order]);
  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <OrderMap car={car} />
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
