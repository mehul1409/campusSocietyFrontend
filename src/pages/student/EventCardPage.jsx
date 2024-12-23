import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import imageSrc from '/mehulBansal.jpeg';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  }));
  

const EventCardPage = () => {
  const { eventId } = useParams(); // Event ID from route
  const [eventDetails, setEventDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8003/api/getEventById/${eventId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        setErrorMessage('Failed to fetch event details.');
        return;
      }

      const data = await response.json();
      setEventDetails(data.event.eventDetails);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setErrorMessage('An error occurred while fetching event details.');
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {errorMessage && <div>{errorMessage}</div>}
      {eventDetails ? (
        <Card sx={{ width: '100%', maxWidth: '1200px', margin: '20px' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="event">
                {eventDetails.title[0]}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={eventDetails.title}
            subheader={new Date(eventDetails.date).toLocaleDateString()}
          />
          <CardMedia
            component="img"
            height="200"
            image={imageSrc}
            alt="Event image"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {eventDetails.description.substring(0, 50)}
              {eventDetails.description.length > 50 && '...'}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{eventDetails.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ) : (
        <Typography>Loading event details...</Typography>
      )}
    </div>
  );
};

export default EventCardPage;
