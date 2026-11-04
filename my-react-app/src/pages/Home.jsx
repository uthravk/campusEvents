import Hero from "../components/Hero"
export default function Home()
{
    return (
        <>
        < Hero />
                {/* Add Event form section */}
                <section className="events-section">
                  <button
                    type="button"
                    className="add-button"
                    onClick={() =>
                      setShowForm(previous => !previous)
                    }
                  >
                    {showForm ? "− Close Form" : "+ Add Event"}
                  </button>
        
                  {showForm && (
                    <AddEventForm
                      onAdd={handleCreateEvent}
                      onCancel={() => setShowForm(false)}
                    />
                  )}
                </section>
        
                {/* Event list, search and category filter */}
                {loading ? (
                  <section className="events-section">
                    <p>Loading events...</p>
                  </section>
                ) : loadError ? (
                  <section className="events-section">
                    <p className="form-error" role="alert">
                      {loadError}
                    </p>
        
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </button>
                  </section>
                ) : (
                  <EventList
                    events={events}
                    onRemove={handleRemove}
                  />
                )}
              </main>
              </>
    )
}