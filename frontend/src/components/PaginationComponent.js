import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./page.css"

// 第276章节 先完成 pagination 然后去 productListPageComponent 继续完成, 最后去backend里面搞一搞
const PaginationComponent = ({
  categoryName,
  subCategoryName,
  childCategoryName,
  fourCategoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) => {
  // 如果category name 是the such part of the path，otherwise empty string
  // const category = categoryName ? `category/${categoryName}/` : "";
  // const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list?categoryName=${categoryName || ''}&subCategoryName=${subCategoryName || ''}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&searchQuery=${searchQuery}&`;
  // return console.log(pageNum);
  // 如果上个return就不会走下面的了。而且这里是 pagination 这个的 to 不能解析？ query url
  return (
    <>
      <Pagination className="ms-4">

        <LinkContainer to={`${url}pageNum=${pageNum - 1}`}>
          <Pagination.Prev disabled={pageNum === 1} />
        </LinkContainer>
        {[...Array(paginationLinksNumber).keys()].map((x) => (
          <LinkContainer key={x + 1} to={`${url}pageNum=${x + 1}`}>
            <Pagination.Item active={x + 1 === pageNum}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        <LinkContainer
          disabled={pageNum === paginationLinksNumber}
          to={`${url}pageNum=${pageNum + 1}`}
        >
          <Pagination.Next />
        </LinkContainer>
      </Pagination>

      {/*       <nav aria-label="...">
        <ul class="pagination pagination-sm">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabIndex="-1">1</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
        </ul>
      </nav> */}

      {/* <ul className="pagination">
        <li><a href={`${url}pageNum=${pageNum - 1}`}>《</a></li>
        {[...Array(paginationLinksNumber).keys()].map((x) => (
          <li className="active?{x + 1 === pageNum}" key={x + 1} >
            <a href={`${url}pageNum=${x + 1}`}>{x + 1}</a>
          </li>
        ))}
        <li><a href={`${url}pageNum=${pageNum + 1}`}>》</a></li>

      </ul> */}
    </>
  );
};

export default PaginationComponent;
