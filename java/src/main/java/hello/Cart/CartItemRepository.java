package hello.Cart;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CartItemRepository extends CrudRepository<CartItem, Long>{

    @Query("select cartitem from CartItem cartitem where cartitem.id = :id")
    CartItem findCartItemById(@Param("id") Integer id);
}
