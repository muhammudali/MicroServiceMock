// tracing.js
const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");

const sdk = new opentelemetry.NodeSDK({
  // This will export traces via OTLP over HTTP. 
  // You can configure the endpoint via the OTEL_EXPORTER_OTLP_ENDPOINT environment variable.
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: 'hello-world-microservice',
});

sdk.start();
console.log('Tracing initialized');