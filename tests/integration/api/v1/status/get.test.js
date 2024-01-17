test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const dbDependencies = responseBody.dependencies.database;
  expect(dbDependencies.version).toBe("16.0");
  expect(dbDependencies.max_connections).toBe(100);
  expect(dbDependencies.opened_connections).toBe(1);
});
