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
  prices: any;
  renderAction?: React.ReactNode,
  onClick: any;
}

const currencyFormatter = (input: number | bigint) => {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
  }).format(input);
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({
  media,
  title,
  description,
  prices,
  renderAction,
  onClick,
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

          {prices.map((price: any) => (
            <Button key={price?.id} size="small" color="primary" onClick={() => onClick(price?.id)}>
              <Typography variant="body2" color="textSecondary" component="p">
                {currencyFormatter(price?.unit_amount)}
              </Typography>
            </Button>
          ))}

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
