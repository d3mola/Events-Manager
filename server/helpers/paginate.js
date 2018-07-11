import db from '../models';

const paginate = (model, limit=12, offset=0) => {
  db.model.findAndCountAll()
    .then(data => {
      let page = parseInt(req.query.page, 10);
      let numOfPages = Math.ceil(data.count / limit);

      if (isNaN(page) || page < 1 ) page = 1;
      if (page >= numOfPages) page = numOfPages;

      offset = limit * (page - 1);

      const paginationOptions = {
        numOfPages,
        count: data.count,
        page
      };

      return paginationOptions;

    }).catch(error => error);
}

export default paginate;