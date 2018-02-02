package hello;

public class Bike {

	private Integer id;
	private String model;
	private String manufacturer;

	public Bike(Integer id, String model, String manufacturer) {
		this.id = id;
		this.model = model;
		this.manufacturer = manufacturer;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

}
