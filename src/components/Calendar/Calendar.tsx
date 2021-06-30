import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Pressable,
    Dimensions,
    TouchableOpacity,
    Platform,
    StyleSheet,
    PixelRatio ,
    ScrollView,
    TouchableWithoutFeedback,
    ViewStyle,
    TextStyle
} from "react-native";
import styles from './Calendar.style'

export type MonthType ={
    id: number
    label: string
    short: string
}

const addZero = (n: number) : string | number => {
    return n < 10 ? `0${n}` : n
  }

const DAYS_NAMES = [
'mon',
'tue',
'wed',
'thu',
'fri',
'sat',
'sun',
]

const DAY_IN_WEEK = 7
const _MONTHS: Array <MonthType> = [ {
    id: 1,
    label: 'January',
    short: 'Jan'
},
{
    id: 2,
    label: 'February',
    short: 'Feb'
},
{
    id: 3,
    label: 'March',
    short: 'Mar'
},
{
    id: 4,
    label: 'April',
    short: 'Apr'
},
{
    id: 5,
    label: 'May',
    short: 'May'
},
{
    id: 6,
    label: 'June',
    short: 'Jun'
},
{
    id: 7,
    label: 'July',
    short: 'Jul'
},
{
    id: 8,
    label: 'August',
    short: 'Aug'
},
{
    id: 9,
    label: 'September',
    short: 'Sep'
},
{
    id: 10,
    label: 'October',
    short: 'Окт'
},
{
    id: 11,
    label: 'November',
    short: 'Nov'
},
{
    id: 12,
    label: 'December',
    short: 'Dec'
},]


const today = new Date()

const RATIO: number = PixelRatio.get()

const SCREEN_WIDTH = Dimensions.get('window').width
// Ширина одного месяца
const MONTH_WIDTH: number  = 100
const monthBlockWidth: number  = MONTH_WIDTH * 12
const MAX_AMOUNT_WEEKS: number  = 6
const COMPENSATION : number = 0.001 * RATIO



// Стили для месяца
const innerStyles = StyleSheet.create({
    itemMonth: {
        marginVertical: 21,
        width: MONTH_WIDTH,
        justifyContent: 'center',
        textAlign: 'center'
    }
})

export type DateRangeType = {
    startDate: string
    endDate: string
}

type Props = {
    onChange: (date: DateRangeType | any) => void
    value?: any
    weekdays?: boolean
    range?: boolean
    months?: Array <MonthType>
    weekDaysLabels?: Array <string>
    classes?:{
        wrapper?: ViewStyle
        weekDaysLables?:{
            workDays?: TextStyle
            dayOff?: TextStyle
        }
        days?: {
            workDays?: TextStyle
            dayOff?: TextStyle
            activeDay?: TextStyle
            activeDayLabel?: TextStyle
            dayLabel?: TextStyle
            rangeDay?: ViewStyle
        }
        month?:{
            active?: any
            unActive?: any
            month?: any
        }
        year?:{
            wrapper?: ViewStyle
            label?: TextStyle
        }
    }
}

/**
 * 
 * @param  classes{
 *     * wrapper - calendar wrapper
 *     * weekDaysLables - weeks days
 *     * days - months days
 *     * month - months
 *     * year - year
 * }
 * @param value - Date
 * @param weekdays - If true then we show weekdays labels
 * @param onChange - Callback return date which have been choosen
 * @param range - boolean/ if true we can choose Date range
 */


const Calendar: FC<Props> = ({
    value = today, 
    months = _MONTHS,
    onChange,
    weekdays = false, 
    weekDaysLabels = DAYS_NAMES,
    classes,
    range = false}) => {   
    const scrollRef = useRef()

    

    const [year, setYear] = useState(value && !range? new Date(value).getFullYear(): today.getFullYear())
    const [month, setMonth] = useState(value && !range? new Date(value).getMonth() + 1: today.getMonth() + 1)
    const [currentDate, setCurrentDate] = useState<any>(value && !range? new Date(value) : today)
    const [calWidth, setCalWidth] = useState(0)
    const [scrollWidth, setScrollWidth] = useState(0)

    const [startDate, setStartDate] = useState<string>(range ? new Date(value.startDate) : '')
    const [endDate, setEndDate] = useState<string>(range ? new Date(value.endDate) : '')


    const MAX_CALENDAR_HEIGHT = (calWidth / DAY_IN_WEEK) * MAX_AMOUNT_WEEKS

     // Array with days count in the month
 const DAYS_IN_MONTH = [
    31,
    value && value !== undefined && value !== null
        ?  new Date(value).getFullYear() % 4 === 0
            ? 29
            : 28
        : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
]

    // get width of the calendar
    const calendarWidth = (event: any) => {
        let {width, height} = event?.nativeEvent?.layout
      
        setCalWidth(width)
    }
    // Get width scroll field
    const scrollLayout = (event: any) => {
        let {width, height} = event?.nativeEvent?.layout
        setScrollWidth(width)
    }



    // one month
    const Item = ({ data }: any) =>{ 
        return(
            <View>
                <View style={[innerStyles.itemMonth,  ((data.id === 1) ? {marginLeft: scrollWidth/2} : (data.id === 12) ? {marginRight: scrollWidth/2} : null)]}>
                    <Text style={[styles.titleMonth, classes?.month?.month, (data.id === month ? [styles.activeMonth, classes?.month?.active] : [styles.unActiveMonth, classes?.month?.unActive])]}>{data.label}</Text>
                </View>
            </View>
        )
      }; 
    
   // Callback when scroll is ended for iOs
    const onHandleScroll = (event: any) => {
        const sX = event.nativeEvent.contentOffset.x
        if(Platform.OS === 'ios'){
            const center = scrollWidth/2 + sX
            const m = Math.floor(((monthBlockWidth + scrollWidth - (monthBlockWidth + scrollWidth - sX - scrollWidth/2) + MONTH_WIDTH) - scrollWidth/2) / 100)
            let currentMonth: number = m        
            if(m < 1){
                currentMonth = 1
            }
            if(m > 12){
                currentMonth = 12
            }
            setMonth(currentMonth)  
                   
        }
    }

    // Callback when scroll is ended
    const scrollEnd = (event: any) => {
        const oX = event.nativeEvent.contentOffset.x
        const center = scrollWidth/2 + oX
        const m = Math.floor(((monthBlockWidth+scrollWidth - (monthBlockWidth+scrollWidth - oX - scrollWidth/2) + MONTH_WIDTH) - scrollWidth/2) / MONTH_WIDTH)
        let currentMonth: number = m        
        if(m < 1){
            currentMonth = 1
        }
        if(m > 12){
            currentMonth = 12
        }
        setMonth(currentMonth)  

           //@ts-ignore
           scrollRef?.current?.scrollTo({ x: MONTH_WIDTH * currentMonth - MONTH_WIDTH/2, y: 0, animated: true })    

    }

    const setStartAndEndDate = (date: any) => {
        if(range){
            if(!startDate && !endDate){
                setStartDate(date)
            }
            if(startDate && !endDate){
                setEndDate(date)
            }
            if(startDate && endDate){
                setEndDate('')
                setStartDate(date)
            }
        }else{
            setCurrentDate(date)
        }
    }

    useEffect(() => {
        if(!range){
            onChange(currentDate)
        } else {
            onChange({
                startDate: startDate || '',
                endDate: endDate || ''
            })
        }
    },[currentDate, startDate, endDate])


// Create days of the month
    const dayItem = (day: any, index: number) => {
        const wrapWidth = calWidth / DAY_IN_WEEK
        const innerWidth = calWidth / DAY_IN_WEEK * 0.8
        const d = new Date(day)
        const cd = new Date(currentDate)

        const oneDay = +d
        const sd = +startDate
        const ed = +endDate

        const getCurrentDay =  ((d.getDate() === cd.getDate()) && (d.getMonth() === cd.getMonth()) && (d.getFullYear() === cd.getFullYear()))


        const rageDate = (((oneDay > sd || oneDay === sd) && (oneDay < ed || oneDay === ed)) || oneDay === sd)

        const dayStyle = [styles.oneDay, classes?.days?.activeDay,{width: innerWidth, height: innerWidth , borderRadius: innerWidth / 2}]
        const currentDayStyle = [styles.currentDay, ...dayStyle]
        const rageDateStyle = [styles.rangeDay, ...dayStyle, classes?.days?.rangeDay]
        let activeDayStyle
        if(rageDate){
            activeDayStyle = rageDateStyle
        }
        if(getCurrentDay){
            activeDayStyle = currentDayStyle
        }
        if(!rageDate && !getCurrentDay){
            activeDayStyle = styles.oneDay
        }
        if(Platform.OS === 'android'){
            return (
                <Pressable
                key={index}
                onPress={() => {
                    if(day){
                        setStartAndEndDate(day)
                        // setCurrentDate(day)
                    }}}>
                    <View style={[styles.dayWrap, {width: wrapWidth - COMPENSATION,height: wrapWidth - COMPENSATION }]}>
                        <View style={[activeDayStyle]}>


                            <Text style={[styles.dayLabel,  getCurrentDay ? [styles.currentDayLabel, classes?.days?.activeDayLabel] : [styles.dayLabel, classes?.days?.dayLabel]]}>{day ?d.getDate() : '' }</Text>
                        </View>
                    </View>
                </Pressable>
            )
        } else {
            return (
                <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                    if(day){
                        setCurrentDate(day)
                    }}}>
                    <View style={[styles.dayWrap, {width: wrapWidth,height: wrapWidth }]}>
                        <View style={[styles.oneDay,
                             getCurrentDay ? 
                             [styles.currentDay, {width: innerWidth, height: innerWidth , borderRadius: innerWidth / 2}] : styles.oneDay]}>
                            <Text style={[styles.dayLabel,  getCurrentDay ? [styles.currentDayLabel,] : styles.dayLabel]}>{day ?d.getDate() : '' }</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    // created week days
    const weekDaysLables = () => {
        const wrapWidth = calWidth / DAY_IN_WEEK
        const innerWidth = calWidth / DAY_IN_WEEK * 0.8
        

        return weekDaysLabels.map((item, index) => {
            const dayoff = index === 5 || index === 6
            return(
                <View  style={[styles.weekdayWrap, {width: wrapWidth}]}>
                    <View style={[styles.weekInner, {width: innerWidth}]}>
                        <Text style={[styles.weekday, dayoff ? [styles.weekdayOff, classes?.weekDaysLables?.dayOff] : [styles.weekdayWork, classes?.weekDaysLables?.workDays]]}>{item}</Text>
                    </View>
                </View>
            )
        })
    }

// create days in the month
    const monthDays = () => {
        let arr: Array<any> = []
        const date = `${year}-${addZero(month)}-01`
        const firstDay = new Date(date).getDay()

        if(firstDay > 1){
            for(let i = 1; i < firstDay; i++){
                const item = dayItem('', i)
                arr.push(item)
            }
        }
        if(firstDay === 0){
            for(let i = 1; i < 6; i++){
                const item = dayItem('', i)
                arr.push(item)
            }
        }
        for(let i = 0; i < DAYS_IN_MONTH[month-1]; i++){
            arr.push(dayItem(new Date(`${year}-${addZero(month)}-${addZero(i+1)}`), i))
        }

        return arr
    }

    
    // Scrolling to current date
    useEffect(() => {
        setTimeout(() => {
             //@ts-ignore
         scrollRef?.current?.scrollTo({ x: MONTH_WIDTH * month - MONTH_WIDTH/2, y: 0, animated: true })

        },500)
  },[])


// COMPONENT
    return(
            <View>
                <View  style={[styles.yearBlock, classes?.year?.wrapper]}>
                    {/* Choose a year */}
                    <Text style={styles.yearLabel}>Year</Text>
                    <View style={styles.yearChange}>
                        <Pressable
                        onPress={() => setYear(year - 1)}
                        >
                            <View style={styles.arrowButton}>
                                <View
                                    style={[styles.prev, styles.arrow]}
                                />
                            </View>
                        </Pressable>
                        <View>
                            <Text style={[styles.yearTitle, classes?.year?.label]}>{year}</Text>
                        </View>
                        <Pressable
                        onPress={() => setYear(year + 1)}
                        >
                            <View style={styles.arrowButtonNext}>
                                <View 
                                    style={[styles.next, styles.arrow]}
                                />
                            </View>
                            
                        </Pressable>
                    </View>
                </View>
                {/* Choose a month */}
                
                <View
                // @ts-ignore
                flexGrow={1}>
                <SafeAreaView style={styles.container}>
                    <ScrollView
                    onScroll={onHandleScroll}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={scrollEnd}
                    onLayout={scrollLayout}
                    directionalLockEnabled 
                    // @ts-ignore
                    ref={scrollRef}
                    horizontal>
                        {months.map((item) => {
                            return (
                                <TouchableOpacity key={item.id}>
                                <Item key={item.id} data={item} />
                                </TouchableOpacity>
                            )
                        })}
                
                    </ScrollView>
                </SafeAreaView>
                </View>
            
                <View
                style={[styles.calendar, {minHeight: MAX_CALENDAR_HEIGHT}]}>
                    {/* Shows days label */}
                    {weekdays &&<View style={[styles.weekDays]}>
                        {weekDaysLables().map((item, index) => {
                            return (
                                <View key={index}>
                                    {item}
                                </View>
                            )
                        })}
                    </View>}

                    {/* Shows days of the month */}
                    <View
                    onLayout={calendarWidth}
                    style={[styles.daysBlock]}>
                        {monthDays().map((item, index) =>{
                            return(
                                <View key={index}>
                                    {item}
                                </View>
                            )
                    })}
                    </View>
                </View>


        </View>

    )
}

export default Calendar