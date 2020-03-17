
exports.seed = async function(knex) {
  
  const testData = [
		{ VIN: "JH2L560SF0BT0WI3V", make: "Ford", model: "Mustang", mileage: "100076", transmission: "manual", title_status: "clean" },
		{ VIN: "108FKKL3V56A90HI3", make: "Toyota", model: "Corolla", mileage: "59405", transmission: "automatic", title_status: "clean" },
		{ VIN: "R003KL6HZ8QIT98B4", make: "Honda", model: "Civic", mileage: "8443", transmission: "automatic", title_status: "salvage" },
  ];
  

  await knex('cars').truncate();

  return knex('cars').insert(testData);
   
};
