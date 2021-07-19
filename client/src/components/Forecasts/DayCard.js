import { CardMedia,CardContent,Typography,Card,CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { dayCardStyle,dayCardImgStyle } from "./styles";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
});
const DayCard = ({t_min,t_max,desc,url,label})=>{
    const classes = useStyles();
    
    return (
      <Card className={classes.root} variant="outlined" style={dayCardStyle}>
      <CardActionArea>
      <CardMedia
      style={dayCardImgStyle}
      >
        <img src={url} alt="weather" />
      </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {label}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
            <br/>
            <strong>{t_max}{'\u00b0'}C</strong> <small>{t_min}{'\u00b0'}C</small>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    );
};
export default DayCard;