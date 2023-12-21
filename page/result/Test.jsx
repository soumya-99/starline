import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const ExampleOne = ({ data, isSingle, gameLength }) => {

  const singleTableData = data.map(item => [
    item.res_a || '-',
    item.res_b || '-',
    item.res_c || '-',
    item.res_d || '-',
    item.res_e || '-',
    item.res_f || '-',
    item.res_g || '-',
    item.res_h || '-'
  ]);

  const pattiTableData = data.map(item => [
    item.ares || '-',
    item.bres || '-',
    item.cres || '-',
    item.dres || '-',
    item.eres || '-',
    item.fres || '-',
    item.gres || '-',
    item.hres || '-'
  ]);

  let jodiTableData = data.map(item => [
    item.a_res || '-',
    item.b_res || '-',
    item.c_res || '-',
    item.d_res || '-',
    item.e_res || '-',
    item.f_res || '-',
    item.g_res || '-',
    item.h_res || '-'
  ]);
  singleTableData[0].splice(gameLength)
  pattiTableData[0].splice(gameLength)
  jodiTableData[0].splice(gameLength)
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', backgroundColor: 'rgba(158, 33, 149, 0.6)', color: 'white', padding: 2, marginBottom: 10 }}>{data[0].date}</Text>
      {!isSingle && <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Rows data={singleTableData} textStyle={styles.text}  />
        <Rows data={pattiTableData} textStyle={styles.text} />
      </Table>}

      {isSingle && <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Rows data={jodiTableData} textStyle={styles.text} />
      </Table>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10, backgroundColor: '#fff',alignContent:'center' },

  text: { margin: 6, fontWeight: '600', color: 'black',textAlign:'center' },
 
});

export default ExampleOne;
