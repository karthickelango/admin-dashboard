import { React, useState } from 'react'
import { Box, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import intractionPlugin from '@fullcalendar/interaction'
import Header from '../components/Header'
import { tokens } from '../theme';


const Calendar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [currentEvents, setCurrentEvents] = useState([])

  console.log(currentEvents?.map(x => x._def.title))
  const handleDateClick = (selected) => {
    const title = prompt('Please enter a new title for your events')
    const calendarApi = selected.view.calendar
    calendarApi.unselect()

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay
      })
    }
  }

  const handleEventClick = (selected) => {
    if (window.confirm(
      `Are you sure you want to delete the event '${selected.event.title}'`)
    ) {
      selected.event.remove()
    }
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Calendar' subtitle='Full Calender interactive page' />
      </Box>
      <Box display='flex' justifyContent='space-between'>
        {/* calendar side bar */}
        <Box
          flex='1 1 20%'
          backgroundColor={colors.primary[400]}
          p='15px'
          borderRadius='4px'
        >
          <Typography variant='h5'>Events</Typography>
          <List>
            {
              currentEvents.map((event, i) => (
                <ListItem key={i} sx={{ backgroundColor: colors.greenAccent[900], margin: '10px 0', borderRadius: '8px' }}>
                  <ListItemText
                    sx={{ color: colors.greenAccent[800] }}
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start)}
                      </Typography>
                    } />
                </ListItem>
              ))
            }
          </List>
        </Box>

        {/* calendar */}
        <Box flex='1 1 100%' ml='15px'>
          <FullCalendar
            height='80vh'
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              intractionPlugin,
              listPlugin
            ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              { id: '1', title: 'Event one', date: '2023-09-19' },
              { id: '2', title: 'Event two', date: '2023-09-20' }
            ]}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Calendar