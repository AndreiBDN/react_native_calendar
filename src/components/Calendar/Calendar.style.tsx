import {StyleSheet, Dimensions} from 'react-native'
import { COLOR } from '../../../vars/COLOR'
const widthWindow = Dimensions.get('window').width

export default StyleSheet.create({
    yearLabel: {
        fontSize: 14,
        fontWeight: '400',
        color: COLOR.BLACK_DARK,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 7
    },
    yearChange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    yearTitle: {
        fontSize: 35,
    fontWeight: '700',
    color: COLOR.BLACK_DARK,

    },
    titleMonth: {
        textAlign: 'center',
        fontSize: 14,
    fontWeight: '400',


    },
    arrowButton: {
        paddingLeft: 15,
        width:70,
        height: 70,
        justifyContent: 'center'
    },
    arrowButtonNext: {
        paddingRight: 15,
        width:70,
        height: 70,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    arrow : {
        width: 12,
        height: 12,
        borderColor: COLOR.BLACK_DARK,
        borderLeftWidth: 2,
        borderBottomWidth: 2
    },
    prev: {
        transform: [
            {rotate: '45deg'}
        ]
    },
    next: {
        transform: [
            {rotate: '-135deg'}
        ]
    },

    container: {
        height: 60
    },
    activeMonth: {
        color: COLOR.BLACK_DARK,
    },
    unActiveMonth: {
        color: COLOR.GRAY
    },

    // Calendar
    yearBlock: {
        paddingHorizontal: widthWindow < 410 ? 10 : 50
    },
    calendar: {
        paddingHorizontal: widthWindow < 410 ? 10 : 50,
        // minHeight: 200
    },
    daysBlock: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    dayWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayLabel: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: COLOR.BLACK_DARK,
    },
    currentDayLabel: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '700',
        color: COLOR.BLACK_DARK,
    },
    currentDay : {
        width: '100%',
        borderWidth: 2,
        borderColor: COLOR.BLACK_DARK,
        backgroundColor: COLOR.CHECK_DAYS
    },
    rangeDay: {
        width: '100%',
        backgroundColor: COLOR.CHECK_DAYS
    },
    oneDay: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',


    },
    weekDays: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    weekdayWrap: {
        justifyContent: 'center'
    },
    weekInner: {
        justifyContent: 'center'
    },
    weekday: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: '#FF4545',
    },
    weekdayOff: {
        fontWeight: '700',
    },
    weekdayWork: {
        color: COLOR.GRAY,
    }
})