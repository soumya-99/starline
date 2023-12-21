import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const authstyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "red",
        flexDirection:"column"
    },
    container: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagecontainar: {
        flex: 1,
    },
    texinput: {
        flex: 1,
        padding: normalize(30)
    },
    label: {
        fontSize: normalize(20),
        marginRight: normalize(8),
        color:"#ffff"
    },
    inputContainer: {
        flex: 1,
    },






    /////////////////////////////////////
    input: {
        fontSize: normalize(16),
        paddingVertical: normalize(8),
        borderBottomWidth: 1,
        borderBottomColor: '#ffff',

    },
    inpCon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(16),
        // marginTop:5
    },
    button: {
        backgroundColor: "#00529E",
        padding: normalize(10),
        width: "100%",
        alignItems: 'center',
        borderRadius: normalize(8),
        marginTop:5

    },
    btn_text: {
        color: "#ffff",
        fontWeight: 'bold',
        fontSize: normalize(20),
    },


    head_text: {
        color: "#ffff",
        fontWeight: 'bold',
        fontSize: normalize(16),
    }
})

export { authstyles }