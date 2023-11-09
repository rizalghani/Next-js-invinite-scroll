import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { iPlanet } from 'constants/interfaces';

type Props = {
  posts: iPlanet[];
};

const ModalFavorites = ({ posts }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planets, setPlanets] = useState(posts);

  useEffect(() => {
    setPlanets(posts);
  }, [posts]);

  const ButtonFavorites = ({ icon, text }: { icon: any; text: string }) => (
    <Button type="primary" icon={React.createElement(icon)} size="large" onClick={showModal}>
      {text}
    </Button>
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ButtonFavorites icon={StarOutlined} text="Favorites" key="list-vertical-star-o" />
      <Modal
        title="Favorite List"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
      >
        {planets
          .filter((obj: iPlanet) => obj.is_favorite == true)
          .map((obj: iPlanet) => (
            <p key={obj.id}>{obj.title}</p>
          ))}
      </Modal>
    </div>
  );
};

export default ModalFavorites;
