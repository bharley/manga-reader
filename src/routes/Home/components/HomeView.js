import React from 'react';
import { Col, Row } from 'react-bootstrap';
import noblesse from '../assets/noblesse.jpg';
import gamer from '../assets/gamer.jpg';
import magician from '../assets/magician.jpg';
import MangaThumbnail from './MangaThumbnail';
import classes from './HomeView.scss';

const manga = [
  {
    name: 'Noblesse',
    slug: 'noblesse',
    thumbnail: noblesse,
    description: 'Read about Cadis Etrama Di Raizel eating Ramen like a boss.',
  },
  {
    name: 'The Gamer',
    slug: 'gamer',
    thumbnail: gamer,
    description: `
      Boy plays games and sometimes characters inexplicably disappear from the storyline.
    `,
  },
  {
    name: 'Magician',
    slug: 'magician',
    thumbnail: magician,
    description: 'Maybe the translations will catch up some day...',
  },
];

export const HomeView = () => (
  <Row>
    <Col xs={12}>
      <h1 className={classes.heading}>Manga Reader</h1>
    </Col>
    {manga.map((props, index) => (
      <Col xs={12} sm={6} md={4} key={`thumbnail-${index}`} className={classes.thumbnail}>
        <MangaThumbnail {...props} />
      </Col>
    ))}
  </Row>
);

export default HomeView;
