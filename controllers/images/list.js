import { Op } from 'sequelize';
import { Users, Images } from '../../models';

export default async (params) => {
  const {
    id, from, to, page, categoryId,
  } = params;

  const { subscriptionId } = await Users.findOne({ where: { id } });

  const query = {
    where: {
      deletedAt: null,
      createdAt: { [Op.between]: [new Date(from), new Date(to)] },
      categoryId: categoryId || true,
      subscriptionId,
    },
    offset: (page - 1) * 10,
    limit: page * 10,
  };

  const result = await Images.findAll(query);

  if (!result) return { code: 500, data: 'internal server error' };

  return { code: 200, data: result };
};
