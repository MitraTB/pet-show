import { useContext, useEffect, useState } from "react";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
const ANIMAL = ["cat", "dog", "reptile", "bird", "rabbit"];
const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);
  useEffect(() => {
    requestPets();
  }, []);
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </label>
        <label htmlFor="animal">
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option value={""}></option>
            {ANIMAL.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option value={""}></option>
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value={"peru"}>peru</option>
            <option value={"darkblue"}>darkblue</option>
            <option value={"chartreuse"}>chartreuse</option>
            <option value={"mediumorchid"}>mediumorchid</option>
          </select>
        </label>
        <button style={{ background: theme }}>Submit</button>
      </form>
      <Results pets={pets} />;
    </div>
  );
};
export default SearchParams;
