import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardComponent = ({destination}) => {
  return (
    <Card style={{ width: '18rem' }} className='mx-3'>
      <Card.Img variant="top" className='destination-image' src={destination.imageUrl} />
      <Card.Body>
        <Card.Title>{destination.name}</Card.Title>
        <Card.Text>
          {destination.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;