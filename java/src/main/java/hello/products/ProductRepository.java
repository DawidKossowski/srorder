package hello.products;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
public interface ProductRepository extends CrudRepository<Product, Long> {
        @Query("SELECT p FROM Product p WHERE p.name = :name")
        Product findProductByName(@Param("name") String name);

        @Query("SELECT p FROM Product p WHERE p.id = :id")
        Product findProductByIntegerId(@Param("id") Integer id);
}
