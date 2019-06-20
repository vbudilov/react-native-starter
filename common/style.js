import {StyleSheet} from "react-native";

export const mainStyle = StyleSheet.create({
    header: {
        backgroundColor: "#007dff"
    },
    content: {
        backgroundColor: '#d7d7d7'
    },
    scroll: {
        backgroundColor: 'white',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    userImage: {
        marginRight: 12,
    },
    listContainer: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 0,
    },
    listItemContainer: {
        borderBottomColor: '#ECECEC',
    },
});
