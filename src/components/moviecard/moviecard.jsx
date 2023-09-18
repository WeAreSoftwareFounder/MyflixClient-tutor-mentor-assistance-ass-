import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

const MovieCard = ({ movie, onMovieClick }) => {
  const { Title, ImagePath, Director } = movie;

  if (!Title || !ImagePath) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>
            Movie information is missing or incomplete.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={ImagePath} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        {typeof Director === 'string' && (
          <Card.Text>{Director}</Card.Text>
        )}
        <Button onClick={() => onMovieClick(movie)} variant="link">
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    Genre: PropTypes.string,
  }),
  onMovieClick: PropTypes.func,
};
export const Movies = MovieCard;
