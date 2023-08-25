import VehiclesCardsList from "@/components/Vehicles/VehiclesCardsList.vue";
import { findByTestId, mountWithPlugins } from "@/test/test-util";

describe("VehiclesCardsList.vue", () => {
  it("renders vehicle cards for each vehicle", () => {
    const mockVehicles = [
      {
        id: "1",
        model: "Car A",
        color: "Red",
        licensePlate: "ABC-123",
        validTill: new Date(2023, 4, 1).toISOString()
      },
      {
        id: "2",
        model: "Car B",
        color: "Blue",
        licensePlate: "XYZ-789",
        validTill: new Date(2023, 7, 15).toISOString()
      }
    ];

    const wrapper = mountWithPlugins(VehiclesCardsList, {
      props: {
        vehicles: mockVehicles
      }
    });

    const vehicleCards = findByTestId(
      wrapper,
      "vehicles-cards-list-item",
      true
    );

    expect(vehicleCards.length).toBe(mockVehicles.length);

    mockVehicles.forEach((vehicle, index) => {
      const card = vehicleCards[index];
      const cardTitle = card.find(".vehicles-cards-list--title");
      expect(cardTitle.text()).toContain(vehicle.model);
      const licensePlate = findByTestId(
        card,
        "vehicles-cards-list--license-plate"
      );
      const validTill = findByTestId(card, "vehicles-cards-list--valid-till");
      const colorDot = findByTestId(card, "vehicles-cards-list--color-dot");
      expect(licensePlate.text()).toContain(vehicle.licensePlate);
      expect(validTill.text()).toContain(
        new Date(vehicle.validTill).toDateString()
      );
      expect(colorDot.element.style.background).toBe(vehicle.color);
    });
  });
});
