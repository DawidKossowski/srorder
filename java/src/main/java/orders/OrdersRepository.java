package hello;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
public interface OrdersRepository extends CrudRepository<hello.Orders, Long> {

    @Query("SELECT o FROM Orders o WHERE o.id = :id")
    hello.Orders findOrderByIntegerId(@Param("id") Integer id);
}
