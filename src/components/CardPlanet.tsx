import React, { useEffect, useRef } from 'react';
import { Card, Space } from 'antd';
import { LikeOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { iPlanet } from 'constants/interfaces';

type Props = {
  post: iPlanet;
  isLast: boolean;
  counterPage: any;
  onChange: any;
};

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CardPlanet = ({ post, isLast, counterPage, onChange }: Props) => {
  const cardRef = useRef<any | null>(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        counterPage();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  const handleFavorite = async (e: any) => {
    let updatePost = { ...post, is_favorite: !post.is_favorite}
    onChange(updatePost)
  };

  return (
    <Card
      ref={cardRef}
      hoverable
      style={{ width: 300 }}
      cover={
        <img style={{ width: 300, height: 250 }} alt={post.alt_description} src={post.image_url} />
      }
      actions={[
        <a onClick={handleFavorite}>
          <IconText
            icon={post.is_favorite ? StarFilled : StarOutlined}
            text=""
            key="list-vertical-star-o"
          />
        </a>,
        <IconText icon={LikeOutlined} text={post.likes.toString()} key="list-vertical-like-o" />
      ]}
    >
      <Card.Meta
        style={{ height: 50 }}
        title={post.alt_description}
        description={post.description}
      />
    </Card>
  );
};

export default CardPlanet;
