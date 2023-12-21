import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const authstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F06ABF",
      },
      title: {
        flex: 8
      },
      body: {
        flex: 92,
        marginHorizontal:normalize(20),
       
      }
})

export { authstyles }