import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

const MovieView = ({ movie, onBackClick }) => {
  const { Title, Description, ImagePath, Director } = movie;

  if (!Title || !Description || !ImagePath) {
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
    <Card>
      <Card.Img variant="top" src={ImagePath} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Description}</Card.Text>
        <Card.Text>
          <strong>Director: </strong>
          {Director && typeof Director === 'object'
            ? Director.Name
            : Director || 'Unknown'}
        </Card.Text>
        <Button variant="primary" onClick={() => onBackClick()}>
          Back to Movie List
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ Name: PropTypes.string.isRequired }),
    ]),
  }),
  onBackClick: PropTypes.func,
};
export const MovieDetails = MovieView;
