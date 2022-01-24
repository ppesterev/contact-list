import { Content, Container } from "react-bulma-components";

import useFetchContacts from "../hooks/use-fetch-contacts";

import ContextualHeading from "./ContextualHeading";
import HeadingRegion from "./HeadingRegion";
import ContactsDisplay from "./ContactsDisplay";
import SortForm from "./SortForm";
import FilterForm from "./FilterForm";

function App() {
  useFetchContacts();

  return (
    <Content>
      <Container>
        <ContextualHeading>My Contacts</ContextualHeading>
        <HeadingRegion>
          <section>
            <ContextualHeading>Sorting</ContextualHeading>
            <HeadingRegion>
              <SortForm />
            </HeadingRegion>
          </section>
          <section>
            <ContextualHeading>Filters</ContextualHeading>
            <HeadingRegion>
              <FilterForm />
            </HeadingRegion>
          </section>
          <section>
            <ContextualHeading>Contact list</ContextualHeading>
            <HeadingRegion>
              <ContactsDisplay />
            </HeadingRegion>
          </section>
        </HeadingRegion>
      </Container>
    </Content>
  );
}

export default App;
