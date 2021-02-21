import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from './styles'

const useStyles = makeStyles(styles)

interface IProductCardProps {
  media: string;
  title: string;
  description: string;
  price: string;
  renderAction?: React.ReactNode
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({
  media,
  title,
  description,
  price,
  renderAction,
}: IProductCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={media}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {renderAction || (
          <Button size="small" color="primary">
            Share
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default ProductCard;
