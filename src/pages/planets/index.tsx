import React, { useEffect, useState } from 'react';
import { Button, Layout, List, Space } from 'antd';
import _ from 'lodash';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { iPlanet } from 'constants/interfaces';
import CardPlanet from 'components/CardPlanet';
import ModalFavorites from 'components/ModalFavorites';

const BASE_URL = `https://api.unsplash.com/search/photos/`;

type Props = {};

const Planets: React.FC = (props: Props) => {
  const [planets, setPlanets] = useState<iPlanet[] | []>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchPlanets();
  }, [page]);

  const fetchPlanets = async () => {
    const response = await fetch(`${BASE_URL}?query=planets&page=${page}`, {
      headers: {
        Authorization: `Client-ID 73zm8NLvh4SZNJS7k5U8t9pEGGJkA5HF8cu8SqdjXxU`
      }
    });
    const { results } = await response.json();
    let res = results.map((obj: any) => {
      return {
        id: obj.id,
        image_url: obj.urls.small_s3,
        title: obj.description,
        alt_description: obj.alt_description,
        likes: obj.likes,
        is_favorite: false
      };
    });
    setPlanets((prev) => [...prev, ...res]);
  };

  const handleChange = async (item: iPlanet) => {
    let index = _.findIndex(planets, (obj: iPlanet) => {
      return obj.id == item.id;
    });

    let find = _.find(planets, function (obj: iPlanet) {
      return obj.id == item.id;
    });

    let newPlanets = [...planets];
    newPlanets[index] = item;
    setPlanets(newPlanets);
  };

  const ButtonFavorites = ({ icon, text }: { icon: any; text: string }) => (
    <Button
      type="primary"
      icon={React.createElement(icon)}
      size="large"
      onClick={handleFavoriteList}
    >
      {text}
    </Button>
  );

  const handleFavoriteList = async () => { };

  return (
    <Layout>
      <Layout.Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'blue'
        }}
      >
          <ModalFavorites posts={planets} />
      </Layout.Header>
      <List
        grid={{ gutter: 16, column: 4 }}
        style={{ margin: 20, marginLeft: 15 }}
        dataSource={planets}
        renderItem={(item, index) => (
          <List.Item>
            <CardPlanet
              key={item.id}
              post={item}
              isLast={index === planets.length - 1}
              counterPage={() => setPage(page + 1)}
              onChange={handleChange}
            />
          </List.Item>
        )}
      ></List>
    </Layout>
  );
};

export default Planets;
