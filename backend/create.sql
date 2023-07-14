DROP TABLE amazonia.step;
DROP TABLE amazonia.delivery;
DROP SCHEMA amazonia;
CREATE SCHEMA amazonia;

CREATE TABLE amazonia.delivery (
  "id" TEXT NOT NULL,
  "start" TEXT NOT NULL,
  "pickup" TEXT NOT NULL,
  "end" TEXT NOT NULL,
  "distance" INTEGER NOT NULL,

  CONSTRAINT "delivery_pkey" PRIMARY KEY ("id")
);

CREATE TABLE amazonia.step (
  "id" TEXT NOT NULL,
  "start" TEXT NOT NULL,
  "end" TEXT NOT NULL,
  "delivery_id" TEXT NOT NULL,

  CONSTRAINT "step_pkey" PRIMARY KEY ("id")
);

ALTER TABLE amazonia.step ADD CONSTRAINT "step_deliveryid_fkey" FOREIGN KEY ("delivery_id") REFERENCES amazonia.delivery("id") ON DELETE CASCADE;
