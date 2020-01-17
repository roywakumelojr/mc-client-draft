import gql from 'graphql-tag';

// export
// commented out and moved to the bottom to remove excess of random worthless errors due to being used before defined
// export {
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     addProject,
//     updateProject,
//     deleteProject
// };

// Product CRUD
// Add

const createProduct = gql`
  mutation AddProductMutation($name: String!) {
    createProduct(data: { name: $name }) {
      id
      name
    }
  }
`;

// Edit

const updateProduct = gql`
  mutation EditProductMutation($name: String!, $id: ID!) {
    updateProduct(where: { id: $id }, data: { name: $name }) {
      id
      name
    }
  }
`;

// Delete

const deleteProduct = gql`
  mutation DeleteProductMutation($id: ID!) {
    deleteProduct(where: { id: $id }) {
      __typename
      id
      name
    }
  }
`;

// Project CRUD
// Add

const addProject = gql`
  mutation AddProjectMutation($name: String!, $id: ID!) {
    createProject(data: { name: $name, product: { connect: { id: $id } } }) {
      id
      name
    }
  }
`;

// Edit

const updateProject = gql`
  mutation EditProjectMutation(
    $name: String!
    $productId: ID!
    $projectId: ID!
  ) {
    updateProject(
      where: { id: $projectId }
      data: { name: $name, product: { connect: { id: $productId } } }
    ) {
      id
      name
    }
  }
`;

// Delete

const deleteProject = gql`
  mutation DeleteProjectMutation($id: ID!) {
    deleteProject(where: { id: $id }) {
      __typename
      id
      name
    }
  }
`;

export {
  createProduct,
  updateProduct,
  deleteProduct,
  addProject,
  updateProject,
  deleteProject,
};
