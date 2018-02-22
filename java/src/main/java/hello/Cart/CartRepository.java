package hello.Cart;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface CartRepository extends CrudRepository<UserCart, Long> {

    @Query("select cart from UserCart cart where cart.user.id = :id")
    UserCart findCartByUserId(@Param("id") Integer id);
}
